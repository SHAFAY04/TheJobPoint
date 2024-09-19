"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.editJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const companySchema_1 = __importDefault(require("../model/companySchema"));
const jobSchema_1 = __importDefault(require("../model/jobSchema"));
const crypto = __importStar(require("crypto"));
companySchema_1.default.hasMany(jobSchema_1.default, { foreignKey: 'companyid' });
jobSchema_1.default.belongsTo(companySchema_1.default, { foreignKey: 'companyid' });
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobSchema_1.default.findAll({
            include: [
                {
                    model: companySchema_1.default,
                    attributes: ['companyid', 'name', 'description', 'contactphone', 'contactemail']
                }
            ],
            attributes: ['jobid', 'jobtype', 'title', 'jobdescription', 'salary', 'location']
        });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobSchema_1.default.findOne({
            include: [
                {
                    model: companySchema_1.default,
                    attributes: ['companyid', 'name', 'description', 'contactPhone', 'contactEmail']
                }
            ],
            attributes: ['jobid', 'jobtype', 'title', 'description', 'salary', 'location'],
            where: { jobid: req.params.id }
        });
        if (!result) {
            return res.status(404).json({ message: 'Job not found!' });
        }
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ message: 'Job doesnt exist' });
    }
});
exports.getJob = getJob;
const editJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!(req === null || req === void 0 ? void 0 : req.body) || !((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.company)) {
            return res.status(400).json({ message: 'Incomplete Fields' });
        }
        const { jobid, jobtype, title, jobdescription, salary, location } = req.body;
        const { name, description, contactphone, contactemail } = req.body.company;
        if (!jobid || !jobtype || !title || !jobdescription || !salary || !location) {
            return res.status(400).json({ message: 'Missing required job fields' });
        }
        // Validate company fields
        if (!name || !description || !contactphone || !contactemail) {
            return res.status(400).json({ message: 'Missing required company fields' });
        }
        const foundjob = yield jobSchema_1.default.findOne({ where: { jobid: jobid } });
        if (!foundjob) {
            return res.status(404).json({ message: 'Job doesnt Exist' });
        }
        //we will do all the company related stuff in the backend to check if the company already exists and stuff based on the company name being sent in the payload
        const jobCompany = yield companySchema_1.default.findOne({ where: { name } });
        if (!jobCompany) {
            const companyid = crypto.randomBytes(64).toString('hex').slice(0, 4);
            yield companySchema_1.default.create({ companyid, name, description, contactphone, contactemail });
            yield jobSchema_1.default.update({ jobtype, title, jobdescription, salary, location, companyid }, { where: { jobid } });
            return res.json({ message: 'Job Edited' });
        }
        yield companySchema_1.default.update({ name, description, contactphone, contactemail }, { where: { name } });
        yield jobSchema_1.default.update({ jobtype, title, jobdescription, salary, location }, { where: { jobid } });
        res.json({ message: 'Job Edited' });
    }
    catch (error) {
        // Catch and handle any unexpected errors
        res.status(500).json({ message: error.message });
    }
});
exports.editJob = editJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!(req === null || req === void 0 ? void 0 : req.body) || !((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.company)) {
        return res.status(400).json({ message: 'invalid data' });
    }
    const { jobid } = req.body;
    const foundjob = yield jobSchema_1.default.findByPk(jobid);
    if (!foundjob) {
        return res.status(404).json({ Message: 'Job not found!' });
    }
    yield jobSchema_1.default.destroy({ where: { jobid } });
});
exports.deleteJob = deleteJob;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!(req === null || req === void 0 ? void 0 : req.body) || !((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.company)) {
        return res.status(400).json({ message: 'invalid data' });
    }
    const { jobid, jobtype, title, jobdescription, salary, location } = req.body;
    const { name, description, contactphone, contactemail } = req.body.company;
    if (!jobid || !jobtype || !title || !jobdescription || !salary || !location) {
        return res.status(400).json({ message: 'Missing required job fields' });
    }
    // Validate company fields
    if (!name || !description || !contactphone || !contactemail) {
        return res.status(400).json({ message: 'Missing required company fields' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactemail && !emailRegex.test(contactemail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    try {
        const preExistingJob = yield jobSchema_1.default.findByPk(jobid);
        if (preExistingJob) {
            return res.status(400).json({ message: 'Job already exists' });
        }
        const preExistingCompany = yield companySchema_1.default.findOne({ where: { name } });
        if (!preExistingCompany) {
            const companyid = crypto.randomBytes(64).toString('hex').slice(0, 4);
            yield companySchema_1.default.create({ companyid, name, description, contactphone, contactemail });
            yield jobSchema_1.default.create({ jobid, jobtype, title, jobdescription, salary, location, companyid });
            return res.json({ message: 'Job creation Successfull!' });
        }
        const companyid = preExistingCompany.getDataValue('companyid');
        yield companySchema_1.default.update({ name, description, contactphone, contactemail }, { where: { name } });
        yield jobSchema_1.default.create({ jobid, jobtype, title, jobdescription, salary, location, companyid });
        res.json({ message: 'Job creation Successfull!' });
    }
    catch (e) {
        console.log('Error Creating job: ', e);
    }
});
exports.createJob = createJob;
