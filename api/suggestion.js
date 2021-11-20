const { getSuggestions } = require("sugiero");

const handler = async (req, res) => {
  try {
    const { query } = req.query;

    const suggestions = await getSuggestions(query);

    res.send(suggestions.map(d => d.term));
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = handler;
