import job from "../model/jobSchema"
import company from "../model/companySchema"
import { Request,Response } from 'express';

company.hasMany(job, { foreignKey: 'companyid' })
job.belongsTo(company, { foreignKey: 'companyid' });

export const handleRecentJob= async(req:Request,res:Response)=>{
    
    try{
        const result = await job.findAll(
           {include:[{model:company,attributes:['companyid', 'name', 'description', 'contactphone', 'contactemail']}],
            attributes:['employer','jobid', 'jobtype', 'title', 'jobdescription', 'salary', 'location']}
        )
        const limit=Number(req.query.limit)
        const recent= result.reverse()
        return res.json( recent.slice(0,limit) )
    }
    catch (err) {
        res.status(500).json({lmao: err })
    }
}