import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './auth.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { CryptoModule } from "@dreamtexx/nestjs-crypto";

// import { StudentSchema } from 'src/models/student.schema';
// import { DriverSchema } from 'src/models/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]), 
     JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),
    CryptoModule.forRoot({
      pepper: 'SomeSecretString', //required
      saltLength: 16, //optional, default 16
      keyLength: 64, //optional, default 64
      delimiter: ':', //optional, default ':'
    }),
  
  ],
  controllers: [AuthController],
  providers: [AuthService,NodemailerService],
  exports:[AuthService]
})
export class AuthModule {}
