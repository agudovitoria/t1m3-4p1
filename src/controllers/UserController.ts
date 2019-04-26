import UserService from '../services/UserService/UserService';
import { HttpError } from './UserController';
import { IUserModel } from '../models/User';
import { IUserService } from '../interfaces/IUserService';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @class UserController
 */
class UserController {

    /**
     * @private
     * @type {IUserModelService}
     * @memberof UserController
     */
    private service: IUserService;

    /**
     * Creates an instance of UserController.
     * @param {IUserModelService} repository
     * @memberof UserController
     */
    constructor(service: IUserService) {
        this.service = service;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise <Response>}
     * @memberof UserController
     */
    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users: IUserModel[] = await this.service.FindAll();

            return res.status(200).json(users);
        } catch (error) {
            next(new HttpError(error.message.status, error.message));
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise <Response>}
     * @memberof UserController
     */
    async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user: IUserModel = await this.service.Find(req.params.id);

            return res.status(200).json(user);
        } catch (error) {
            next(new HttpError(error.message.status, error.message));
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise <Response>}
     * @memberof UserController
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user: IUserModel = await this.service.Insert(req.body);

            return res.status(200).json(user);
        } catch (error) {
            next(new HttpError(error.message.status, error.message));
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise <Response>}
     * @memberof UserController
     */
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user: IUserModel = await this.service.Delete(req.params.id);

            return res.status(200).json(user);
        } catch (error) {
            next(new HttpError(error.message.status, error.message));
        }
    }
}

export default new UserController(UserService);
