import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensResolver } from './screens.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './entities/screen.entity';
import { SpecialScreen } from './entities/specialScreen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screen, SpecialScreen])],
  providers: [ScreensService, ScreensResolver],
})
export class ScreensModule {}
