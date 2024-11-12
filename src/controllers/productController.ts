import { NextFunction, Request, Response } from 'express';
import { IProductInteractor } from '../interfaces/IProductInteractor';
import { inject } from 'inversify';
import { INTERFACE_TYPE } from '../utils';

export class ProductController {
  private interactor: IProductInteractor;

  constructor(
    @inject(INTERFACE_TYPE.ProductInteractor) interactor: IProductInteractor,
  ) {
    this.interactor = interactor;
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const data = await this.interactor.createProduct(body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async onGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = 10, offset = 0 } = req.query;

      const data = await this.interactor.getProducts(
        Number(limit),
        Number(offset),
      );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async onUpdateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const body = req.body;

      const data = await this.interactor.updateProduct(Number(id), body.stock);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
