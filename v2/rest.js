const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const express = require('express');
const router = express.Router();
router.use(express.json());
const commentsController = require("../controllers/db.contr");
const apiController = require("../controllers/Api.contr");
const modelsController = require("../controllers/Models.contr");

/**
 * @swagger
 * /:
 *   get:
 *     description: Возвращает простое сообщение с приветствием.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful response with status "ok" and a "Hello world" message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Hello massage.
 */


router.get('/', (req, res) => {
    res.status(200).send("Hello");
});



// Api
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Получить API ключ по имени пользователя
 *     tags:
 *        - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Имя пользователя
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращается объект с API ключом.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiObject'
 *       '400':
 *         description: Неверный запрос. Не передано имя пользователя или имя пользователя имеет неверный формат.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '500':
 *         description: Внутренняя ошибка сервера. Не удалось получить API ключ.
 */
router.post("/login", apiController.getApi);
/**
 * @swagger
 *  /logout:
 *    delete:
 *      summary: Завершение сеанса пользователя
 *      description: Запрос для выхода из системы и удаления API ключа.
 *      tags:
 *        - Authentication
 *      security:
 *        - ApiKeyAuth: []
 *      responses:
 *        '200':
 *          description: Успешное завершение сеанса
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DeletedApi'
 *        '401':
 *          description: Не передан API.
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *        '500':
 *          description: Внутренняя ошибка сервера. Не удалось получить модель.
 */
router.delete("/logout", apiController.deleteApi);

// Models
/**
 * @swagger
 * components:
 *   schemas:
 *     ModelData:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: Имя пользователя
 *         modelName:
 *           type: string
 *           description: Имя модели
 *         code:
 *           type: object
 *           description: JSON модели
 *         description:
 *           type: string
 *           description: Описание модели (опционально)
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: Комментарии (опционально)
 *       required:
 *         - userName
 *         - modelName
 *         - code
 *  
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Описание ошибки валидации
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Описание ошибки авторизации
 *     BadRequestError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Описание ошибки невалидного запроса
 *     ApiObject:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: Имя пользователя
 *         api:
 *           type: string
 *           description: API ключ
 *     DeletedApi:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               description: Имя пользователя
 *             api:
 *               type: string
 *               description: Удаленный API ключ
 *   securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         in: header
 *         name: api
 */
/**
 * @swagger
 * /models:
 *   get:
 *     summary: Получить все модели
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает список всех моделей.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ModelData'
 *       '500':
 *         description: Внутренняя ошибка сервера. Запрос не может быть выполнен.
 */
router.get("/models", modelsController.getAllModels);
/**
 * @swagger
 * /models/{id}:
 *   get:
 *     summary: Получить модель по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID модели
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Модель успешно найдена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModelData'
 *       '400':
 *         description: Не валидный ID модели.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '500':
 *         description: Внутренняя ошибка сервера. Не удалось получить модель.
 */
router.get("/models/:id", modelsController.getModelId);
/**
 * @swagger
 * /models:
 *   post:
 *     summary: Добавить модель
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModelData'
 *     responses:
 *       '201':
 *         description: Модель успешно добавлена.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: Ошибка валидации. Некорректные данные модели или недостаточно данных.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '401':
 *         description: Не передан API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '500':
 *         description: Внутренняя ошибка сервера. Модель не может быть добавлена.
 */
router.post("/models", apiController.checkApi, modelsController.addModel);
/**
 * @swagger
 * /models/{id}:
 *   put:
 *     summary: Обновить модель по ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID модели
 *         schema:
 *           type: string
 *       - in: body
 *         name: modelData
 *         required: true
 *         description: Данные модели
 *         schema:
 *           $ref: '#/components/schemas/ModelData'
 *     responses:
 *       '200':
 *         description: Модель успешно обновлена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModelData'
 *       '400':
 *         description: Невалидный ID модели или отсутствуют данные о модели.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '401':
 *         description: Не передан API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '402':
 *         description: Ошибка валидации. Некорректные данные модели или недостаточно данных.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Внутренняя ошибка сервера. Не удалось обновить модель.
 */
router.put("/models/:id", apiController.checkApi, modelsController.updateModel);
/**
 * @swagger
 * /models/{id}:
 *   delete:
 *     summary: Удалить модель по ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID модели
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Модель успешно удалена.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: number
 *                   description: Количество удаленных моделей
 *       '400':
 *         description: Невалидный ID модели.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '401':
 *         description: Не передан API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '500':
 *         description: Внутренняя ошибка сервера. Не удалось удалить модель.
 */
router.delete("/models/:id", apiController.checkApi, modelsController.deleteModelId);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Получить все комментарии
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает список всех комментариев.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя автора комментария
 *               text:
 *                 type: string
 *                 description: Текст комментария
 *             required:
 *               - name
 *               - text
 *       '500':
 *         description: Внутренняя ошибка сервера. Запрос не может быть выполнен.
 */

//comments
router.get("/comments", commentsController.getComments);
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Создать новый комментарий
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя автора комментария
 *               text:
 *                 type: string
 *                 description: Текст комментария
 *             required:
 *               - name
 *               - text
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает обновленный список всех комментариев.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '400':
 *         description: Неверные данные в комментарии.
 *       '500':
 *         description: Внутренняя ошибка сервера. Запрос не может быть выполнен.
 */
router.post("/comments", express.json(), commentsController.postAdd);
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Получить комментарий по идентификатору
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор комментария
 *     responses:
 *       '200':
 *         description: Успешный запрос. Возвращает найденный комментарий.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя автора комментария
 *               text:
 *                 type: string
 *                 description: Текст комментария
 *             required:
 *               - name
 *               - text
 *       '404':
 *         description: Комментарий не найден.
 */
router.get("/comments/:id", commentsController.getCommentId);

router.use((err, res, req, next)=>{
    res.status(500).json(err);
});

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API Hello world",
        version: "1.0.0",
        description: "Демо вариант для Swagger",
    },
    components: {
        securitySchemes: {
            apikey: {
                description:
                    "API ключ для авторизации, если нет, то можно воспользоваться `123`.",
                type: "apiKey",
                name: "api",
                in: "header",
            },
        },
    },
    servers: [
        {
            url: "http://127.0.0.1:5500/v2",
            description: "Локальный для разработки",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./v2/*.js"], // из каких файлов забираем JSDoc @swagger
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;