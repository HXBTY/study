import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {AnyFilesInterceptor} from "@nestjs/platform-express";

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  body(@Body() createPerson: CreatePersonDto) {
    return `received: ${JSON.stringify(createPerson)}`
  }

  @Post("file")
  @UseInterceptors(AnyFilesInterceptor  ({
    dest: "uploads/"
  }))
  body2(@Body() createPersonDto: CreatePersonDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return `received: ${JSON.stringify(createPersonDto)}`
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  /**
   * @description 使用query获取参数 由于匹配路由是由上到下，需要写在 urlParam的前面
   * @param name
   * @param age
   */
  @Get("find")
  query(@Query("name") name: string, @Query("age") age: number) {
    return `received: name=${name}, age=${age}`
  }

  /**
   * @description 使用urlParam接受参数 例：api/person/123
   * @param id
   */
  @Get(':id')
  urlParam(@Param("id") id: string) {
    return `received: id=${id}`
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
