import { pool } from "../database/database.js";

export const GetClients = async (req,res) => {
    const {page = 1} = req.query
    const {rowCount} = await pool.query({
        
        text:`select * from Clientes`

    });
    const totalregis = 3;

    const limit = Math.ceil(rowCount/totalregis);
    const offset = (page -1 )* limit;

    const {rows} = await pool.query({
        
        text:`select * from Clientes limit $1 offset $2`,
        values:[limit,offset]

    })

    return res.status(200).json({
        success:true,
        message: 'Get all clients',
        data:rows,
        totalCountData:rowCount,
        totalPages: Math.ceil(rowCount/limit),
        limit:limit,
        totalregis:totalregis,
        currentPage:page
    })
}

export const GetClientsById = async (req,res) => {
    const {id} = req.params

    const {rows,rowCount} = await pool.query({
        
        text:`select * from Clientes where id=$1`,
        values:[id]

    })

    if(rowCount==0){
        return res.status(404).json({
            success:false,
            message: 'clients not found',
            data:[],
            totalCountData:rowCount,
        })
    }
    else{

    
    return res.status(200).json({
        success:true,
        message: 'Get one clients',
        data:rows,
        totalCountData:rowCount,
    })
}
}

export const createClients = async (req,res) => {
    const {name,email} = req.body

    try
    {
    const {rows,rowCount} = await pool.query({
        text:`insert into Clientes (name,email)
        values($1,$2)
        RETURNING *`,
        values:[name,email]
    })

    return res.status(201).json({
        success:true,
        message: 'clients already created successfully',
        data:rows,
        totalCountData:rowCount,
    })
    }
    catch(error) {

    
        if(error.code=23505)
        return res.status(409).json({
            success:false,
            message: 'clients already exists',
            data:[]
           
        })
    }
   
   

    
    


    
}

export const updateClients = async (req,res) => {
    const {name,email} = req.body
    const {id} = req.params

    try
    {
    const {rows,rowCount} = await pool.query({
        text:`update Clientes set name=$1,email=$2
        where id=$3
        RETURNING *`,
        values:[name,email,id]
    })

    if(rowCount==0){
        return res.status(404).json({
            success:false,
            message: 'clients not found',
            data:[],
            totalCountData:rowCount,
        })
    }

    return res.status(200).json({
        success:true,
        message: 'clients already updated successfully',
        data:rows,
        totalCountData:rowCount,
    })
    }
    catch(error) {

    
       
        return res.status(500).json({
            success:false,
            message: error,
            data:[]
           
        })
    }
   
   

    
    


    
}

export const deleteClients = async (req,res) => {
  
    const {id} = req.params

    try
    {
    const {rows,rowCount} = await pool.query({
        text:`delete from Clientes
        where id=$1
        RETURNING *`,
        values:[id]
    })

    if(rowCount==0){
        return res.status(404).json({
            success:false,
            message: 'clients not found',
            data:[],
            totalCountData:rowCount,
        })
    }

    return res.status(200).json({
        success:true,
        message: 'clients already deleted successfully',
        data:rows,
        totalCountData:rowCount,
    })
    }
    catch(error) {

    
       
        return res.status(500).json({
            success:false,
            message: error,
            data:[]
           
        })
    }
   
   

    
    


    
}