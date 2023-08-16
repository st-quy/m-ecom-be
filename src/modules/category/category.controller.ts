import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities';
import { AddCategoryDTO } from './dto/addCategory.dto';


@Controller('category')
export class CategoryController {

constructor(private readonly categoryService: CategoryService){}

@Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(@Body() addCategoryDTO: AddCategoryDTO) {
    const category = await this.categoryService.addCategory(addCategoryDTO);
    return   category ;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() category: Category) {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoryService. remove(id);
  }


}
