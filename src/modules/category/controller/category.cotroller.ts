import { CategoryModel } from "../models/category.model.js";
import { Request, Response } from "express";

class categorycontroller {
  async categoryGet(req: Request, res: Response): Promise<void> {
    try {
      const {id}=req.params
      const categoryFind = await CategoryModel.findOne({_id:id}).populate('jobs');
      
      res.status(200).send({ status: 200, data: categoryFind, error: false });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
  async categoryCreated(req: Request, res: Response): Promise<void> {
    try {
      const { categoryName } = req.body;

      if (categoryName == undefined) {
        res.status(401).json({
          status: 401,
          errorMsg: "name must not be empty",
          error: true,
        });
        return;
      }

      const created = await CategoryModel.create({
        categoryName: categoryName,
      });
      res.status(201).send({ status: 201, data: created, error: false });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ status: 500, errorMsg: error.message, error: true });
      return;
    }
  }
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryName } = req.body;
      const { id } = req.params;

      const findCategoryUpdate = await CategoryModel.findOne({ _id: id });
      if (!findCategoryUpdate) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "Category not found", error: true });
        return;
      }

      findCategoryUpdate.categoryName = categoryName;

      await findCategoryUpdate.save();
      res
        .status(201)
        .send({ status: 201, data: findCategoryUpdate, error: false });
      return;
    } catch (error: any) {
      res.status(500).json({ status: 500, data: null, error: true });
      return;
    }
  }
  async categoryDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const findCategory = await CategoryModel.findOne({ _id: id });

      if (!findCategory) {
        res
          .status(404)
          .json({ status: 404, errorMsg: "category not foud", error: true });
        return;
      }
      await CategoryModel.deleteOne({ findCategory });
      res.status(200).send({ status: 200, data: findCategory, error: false });
      return;
    } catch (error: any) {
      res.status(500).json({ status: 500, data: null, error: true });
      return;
    }
  }
}

export const CategoryController = new categorycontroller();
