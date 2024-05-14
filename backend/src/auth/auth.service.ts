import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { TUser } from './user.entity';
import { LinkedinService } from '../linkedin/linkedin.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private linkedinService: LinkedinService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const isUserEXist = await this.userModel.findOne({ email });
    if (isUserEXist) {
      throw new ConflictException('User already exists!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id, name: user.name });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ user: Omit<TUser, 'password'> }> {
    const { email: UserEmail, password } = loginDto;

    const user = await this.userModel.findOne({ email: UserEmail });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { _id, name, email } = user.toObject(); // Exclude password field
    const token = this.jwtService.sign({ id: user._id });
    // Fetch LinkedIn profile data after successful login
    let linkedinData;
    try {
      // Fetch LinkedIn profile data after successful login
      linkedinData = await this.linkedinService.getUserProfile(name);
    } catch (error) {
      console.error('Failed to fetch LinkedIn data:', error);
      // Handle the error gracefully
      linkedinData = null;
    }
    // Merge LinkedIn data with user data
    return { user: { _id, name, email, token, linkedinData } };
  }
}
