// get list of personally-owned special items
exports.getUsersLoyalties = async (req, res) => {
  try {
    // console.log(req);
    const userDoc = await User.findOne({ _id: req.params.id });
    res.status(200);
    return res.json(userDoc.loyalties);
  } catch (e) {
    // LOG
    // CUSTOM ERROR OBJECT
    res.status(500);
  }
};
