import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const PORT =3000;

const swaggerOptions ={
definition:{
    openapi: "3.0.0",
    info:{
        title: "Users API",
        version: "1.0.0",
        description: "A simple Express Users API",
    },
    
},
apis: ["./server.js"],
};

const swaggerDocs= swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT,()=>{
    console.log(`Server is running in 'http://localhost:${PORT}`);

    let users =[
        {
            id: 1,
            name:"Smith",
            age: 21
        },
        {
            id: 2,
            name: "Mike",
            age: 30
        },
        
        { 
            id: 3,
            name:"Leana", 
            age: 32
          },
          { 
            id: 4,
            name:"Monalisa",
            age: 25
          },
          { 
            id: 5,
            name:"Peter", 
            age: 22
          },
    ];

    /**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     description: Retrieve a list of users in the library.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   age:
 *                     type: number
 */

app.get('/users',(req ,res)=> {
    res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:                         
 *     summary: Add a new user
 *     requestBody:
 *       required: true            
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:                   
 *       200:
 *         description: User added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object        
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: number
 */


app.post('/users',(req, res)=> {
        const newUser= {
            id: users.length +1,
            name: req.body.name,
            age: req.body.age,
        };
        users.push(newUser);
        res.json({message:"User added successfully !", user:newUser});
    });
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object        
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     age:
 *                       type: number
 *       404:
 *         description: User not found.
 */
   

app.put('/users/:id', (req, res)=> {
        const userId= parseInt(req.params.id);
        const user= users.find((u)=> u.id === userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        res.json({message:"User updated successfully !", user});
    });

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object        
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found.
 */

    app.delete('/users/:id', (req, res) => {
        const userId = parseInt(req.params.id);
        users = users.filter((u)=> u.id !== userId);
        res.json({message: "User deleted successfully !"});
    });
    
});