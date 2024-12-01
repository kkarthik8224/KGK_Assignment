const { v4: uuidv4 } = require('uuid');
const Resource = require('../models/resources');

exports.createResource = async (req, res) => {
  try {
    const { resource_url, expiration_time } = req.body;
    if ( resource_url === null || resource_url === undefined) throw "resource_url is missing";
    if ( expiration_time === null || expiration_time === undefined ) throw "expiration_time is missing";
    const access_token = uuidv4();
    const resource = await Resource.create({
      user_id: req.user.id,
      resource_url,
      access_token,
      expiration_time,
    });
    res.status(201).json(resource);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating resource', error });
  }
};

exports.getResources = async (req, res) => {
  try {
    let { status, offset, limit } = req.query;
    console.log (req.query);
    if (offset === undefined || !offset || isNaN(offset)) offset =0;
    if (limit === undefined || !limit || isNaN(limit))  limit = 5;
    const where = { user_id: req.user.id };
    if (status) where.status = status;
    const resources = await Resource.findAll({ where,
    attributes: ['id', 'resource_url', 'access_token','status'],
    limit: Number(limit),
    offset: Number(offset)
     });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

exports.getResourceById = async (req, res) => {
  try {
   const token = req.query.token;
   if (token === undefined || !token) throw "Token not provided"
    const resource = await Resource.findOne({
      where: {  access_token: req.query.token },
      attributes: ['id', 'resource_url', 'status']
    });
    if (!resource || resource.status === 'expired') {
      return res.status(404).json({ message: 'Resource not found or expired' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error });
  }
};

exports.deleteResource = async (req, res) => {

  try {
    const token = req.query.token;
    if (token === undefined || !token) throw "Token not provided"
    const resource = await Resource.findOne({ where: { access_token: req.query.token, user_id: req.user.id } });
    if (!resource) return res.status(403).json({ message: 'Unauthorized' });
    await resource.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};
