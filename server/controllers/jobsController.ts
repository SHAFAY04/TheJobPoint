
import company from '../model/companySchema'
import job from '../model/jobSchema';

company.hasMany(job, { foreignKey: 'companyid' })
job.belongsTo(company, { foreignKey: 'companyid' });

const getAllJobs = async (req, res) => {

    try {
        const result = await job.findAll({

            include: [
                {
                    model: company,
                    attributes: ['companyid', 'name', 'description', 'contactphone', 'contactemail']
                }
            ],
            attributes: ['jobid', 'jobtype', 'title', 'jobdescription', 'salary', 'location']

        })
        res.json(result)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
const getJob = async (req, res) => {

    try {
        const result = await job.findOne({

            include: [
                {
                    model: company,
                    attributes: ['companyid', 'name', 'description', 'contactPhone', 'contactEmail']
                }
            ],
            attributes: ['jobid', 'jobtype', 'title', 'description', 'salary', 'location'],
            where: { jobid: req.params.id }
        })
        res.json(result)
    } catch (error) {

        res.status(404).json({ message: 'Job doesnt exist' })
    }
}
const editJob = async (req, res) => {

    if (!req?.body || !req?.body?.company) {
        return res.status(400).json({ message: 'Incomplete Fields' })
    }

    const { jobid, jobtype, title, jobdescription, salary, location } = req.body
    const { companyid, name, description, contactphone, contactemail } = req.body.company

    if (!jobid || !jobtype || !title || !jobdescription || !salary || !location) {
        return res.status(400).json({ message: 'Missing required job fields' });
    }

    // Validate company fields
    if (!companyid || !name || !description || !contactphone || !contactemail) {
        return res.status(400).json({ message: 'Missing required company fields' });
    }

    const foundjob = await job.findOne({ where: { jobid: jobid } })

    if (!foundjob) {

        return res.status(404).json({ message: 'Job doesnt Exist' })
    }

    const jobCompany = await company.findOne({ where: { companyid } })
    if (!jobCompany){

        await company.create({companyid,name,description,contactphone,contactemail})
        await job.update({jobtype,title,jobdescription,salary,location,companyid},{where:{jobid}})
        return res.json({message:'Job Edited'})
    }
    await company.update({name,description,contactphone,contactemail},{where:{companyid}})
    await job.update({jobtype,title,jobdescription,salary,location},{where:{jobid}})
    res.json({message:'Job Edited'})

}
const deleteJob = (req, res) => {

}
const createJob = async (req, res) => {

    if (!req?.body || !req?.body?.company) {
        return res.status(400).json({ message: 'invalid data' })
    }

    const { jobid, jobtype, title, jobdescription, salary, location } = req.body
    const { companyid, name, description, contactphone, contactemail } = req.body.company

    if (!jobid || !jobtype || !title || !jobdescription || !salary || !location) {
        return res.status(400).json({ message: 'Missing required job fields' });
    }

    // Validate company fields
    if (!companyid || !name || !description || !contactphone || !contactemail) {
        return res.status(400).json({ message: 'Missing required company fields' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactemail && !emailRegex.test(contactemail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const preExistingCompany = await company.findOne({ where: { companyid } })

        if (!preExistingCompany) {

            await company.create({ companyid, name, description, contactphone, contactemail })
            await job.create({ jobid, jobtype, title, jobdescription, salary, location, companyid })
            return res.json({ message: 'Job creation Successfull!' })
        }

        //in the frontend ill check on realtime if the company name in the target box matches any of the companies in the database if it does ill grab that company's id else i would just create a new company id with nano id 
        await company.update({ name, description, contactphone, contactemail }, { where: { companyid } })
        await job.create({ jobid, jobtype, title, jobdescription, salary, location, companyid })
        res.json({ message: 'Job creation Successfull!' })

    }
    catch (e) {
        console.log('Error Creating job: ', e)
    }
}

export { getAllJobs, getJob, createJob, editJob, deleteJob }