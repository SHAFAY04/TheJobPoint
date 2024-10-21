import { Request,Response } from 'express';
import company from '../model/companySchema'
import job from '../model/jobSchema';
import * as crypto from 'crypto'

company.hasMany(job, { foreignKey: 'companyid' })
job.belongsTo(company, { foreignKey: 'companyid' });

interface requestType extends Request{

    body:{
        employer?:string,
        jobid?:string,
        jobtype?:string,
         title?:string,
          jobdescription?:string,
           salary?:string,
            location?:string
            company?:{
                name?:string,
                 description?:string,
                  contactphone?:string,
                   contactemail?:string
            }
    },
}


const getAllJobs = async (req:requestType, res:Response) => {


    try {
        const result = await job.findAll({

            include: [
                {
                    model: company,
                    attributes: ['companyid', 'name', 'description', 'contactphone', 'contactemail']
                }
            ],
            attributes: ['employer','jobid', 'jobtype', 'title', 'jobdescription', 'salary', 'location']

        })
        res.json(result)
        
    }
    catch (err) {
        res.status(500).json({lmao: err })
    }
}
const getJob = async (req:requestType, res:Response) => {

    try {
        const result = await job.findOne({

            include: [
                {
                    model: company,
                    attributes: ['companyid', 'name', 'description', 'contactphone', 'contactemail']
                }
            ],
            attributes: ['employer','jobid', 'jobtype', 'title', 'jobdescription', 'salary', 'location'],
            where: { jobid: req.params.id }
        })
        if(!result){
            return res.status(404).json({message:'Job not found!'})
        }
        res.json(result)
    } catch (error) {

        res.status(500).json({message: 'Error making request ' })
    }
}
const editJob = async (req:requestType, res:Response) => {

    try{
    if (!req?.body || !req?.body?.company) {
        return res.status(400).json({ message: 'Incomplete Fields' })
    }

    const { employer, jobid, jobtype, title, jobdescription, salary, location } = req.body
    const { name, description, contactphone, contactemail } = req.body.company

    if (!employer ||!jobid || !jobtype || !title || !jobdescription || !salary || !location) {
        return res.status(400).json({ message: 'Missing required job fields' });
    }

    // Validate company fields
    if ( !name || !description || !contactphone || !contactemail) {
        return res.status(400).json({ message: 'Missing required company fields' });
    }

    const foundjob = await job.findOne({ where: { jobid: jobid } })

    if (!foundjob) {

        return res.status(404).json({ message: 'Job doesnt Exist' })
    }
    //we will do all the company related stuff in the backend to check if the company already exists and stuff based on the company name being sent in the payload

    const jobCompany = await company.findOne({ where: { name } })
    if (!jobCompany){
        const companyid=crypto.randomBytes(64).toString('hex').slice(0,4)
        await company.create({companyid,name,description,contactphone,contactemail})
        await job.update({jobtype,title,jobdescription,salary,location,companyid},{where:{jobid}})
        return res.json({message:'Job Edited'})
    }
    await company.update({name,description,contactphone,contactemail},{where:{name}})
    await job.update({jobtype,title,jobdescription,salary,location},{where:{jobid}})
    res.json({message:'Job Edited'})
    }
    catch (error) {
        // Catch and handle any unexpected errors
        res.status(500).json({ message: (error as Error).message });
    }

}

const deleteJob = async(req:requestType, res:Response) => {

    if(!req?.body || !req?.body?.company){
        return res.status(400).json({message:'invalid data'})
    }
    const {jobid}=req.body
    try{
        const foundjob=await job.findByPk(jobid)
    
        if(!foundjob){
            return res.status(404).json({message:'Job not found!'})
        }
    
        await job.destroy({where:{jobid}})

        res.json({message:'Job Deleted'})
    }
    catch (error) {
        // Catch and handle any unexpected errors
        res.status(500).json({ message: (error as Error).message });
    }
}

const createJob = async (req:requestType, res:Response) => {

    if (!req?.body || !req?.body?.company) {
        return res.status(400).json({message: 'invalid data' })
    }

    const { employer,jobid, jobtype, title, jobdescription, salary, location } = req.body
    const { name, description, contactphone, contactemail } = req.body.company

    if (!employer||!jobid || !jobtype || !title || !jobdescription || !salary || !location) {
        return res.status(400).json({ message: 'Missing required job fields' });
    }

    // Validate company fields
    if ( !name || !description || !contactphone || !contactemail) {
        return res.status(400).json({ message: 'Missing required company fields' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactemail && !emailRegex.test(contactemail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        console.log(employer)
        const preExistingJob=await job.findByPk(jobid)
        if(preExistingJob){
            return res.status(400).json({message:'Job already exists'})
        }
        const preExistingCompany = await company.findOne({ where: { name } })

        if (!preExistingCompany) {

           const companyid=crypto.randomBytes(64).toString('hex').slice(0,4)
            await company.create({ companyid, name, description, contactphone, contactemail })
            await job.create({ employer,jobid, jobtype, title, jobdescription, salary, location, companyid })
            return res.json({ message: 'Job creation Successfull!' })
        }
        const companyid=preExistingCompany.getDataValue('companyid')
        await company.update({ name, description, contactphone, contactemail }, { where: { name } })
        await job.create({employer, jobid, jobtype, title, jobdescription, salary, location, companyid })
        res.json({ message: 'Job creation Successfull!' })

    }
    catch (e) {
        console.log('Error Creating job: ', e)
    }
}


export { getAllJobs, getJob, createJob, editJob, deleteJob }