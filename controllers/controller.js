const db = require('../models');
const { addSchoolSchema, listSchoolsSchema } = require('../validators/validator');
const { haversineDistanceKm } = require('../services/distance_service');
const logger = require('../utils/logger');
const Cust = require("../utils/customResponse");
const constants =require("../constants/constants")

const addSchool = async (req, res) => {
  try {
    const { error: valErr, value } = addSchoolSchema.validate(req.body);
    if (valErr) {
      return Cust.Error(res, valErr.details.map(d => d.message).join(', '), constants.constants.VALIDATION_ERROR, "Validation Error");
    }

    const { name, address, latitude, longitude } = value;

    const existingSchool = await db.School.findOne({
      where: { latitude, longitude }
    });
  
    if (existingSchool) {
      return Cust.Error(
        res,
        `A school already exists at coordinates (${latitude}, ${longitude})`,
        constants.constants.CONFLICT, 
        "Duplicate Location"
      );
    }

    const newSchool = await db.School.create({ name, address, latitude, longitude });

    logger.info('School created id=%d name=%s', newSchool.id, newSchool.name);

    return Cust.Response(res, newSchool, constants.constants.STATUS_CREATED);
  } catch (err) {
    logger.error('addSchool error: %o', err);
    return Cust.Error(res, 'Failed to create school', constants.constants.INTERNAL_SERVER_ERROR, "Internal Server Error");
  }
};


const listSchools = async (req, res) => {
  try {
    const { error: valErr, value } = listSchoolsSchema.validate(req.query);
    if (valErr) {
      return Cust.Error(res, valErr.details.map(d => d.message).join(', '), constants.constants.VALIDATION_ERROR, "Validation Error");
    }

    const userLat = parseFloat(value.lat);
    const userLon = parseFloat(value.lon);

    const schools = await db.School.findAll({ raw: true });

    const schoolsWithDistance = schools.map(s => {
      const distKm = haversineDistanceKm(
        userLat,
        userLon,
        parseFloat(s.latitude),
        parseFloat(s.longitude)
      );
      return { ...s, distance_km: distKm };
    });

    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return Cust.Response(res, schoolsWithDistance,constants.constants.SUCCESS);
  } catch (err) {
    logger.error('listSchools error: %o', err);
    return Cust.Error(res, 'Failed to list schools', constants.constants.VALIDATION_ERROR, "Internal Server Error");
  }
};


module.exports = { addSchool, listSchools };
