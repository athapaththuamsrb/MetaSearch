const express = require("express");
const { Client } = require("@elastic/elasticsearch");

const router = express.Router();
const elastic_search_index_name = process.env.ELASTICSEARCH_INDEX_NAME;

const elasticClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

router.get("/", async (req, res) => {
  // Define the route logic for searching in Elasticsearch here
  const { q } = req.query;
  try {
    const response = await elasticClient.search({
      index: elastic_search_index_name,
      size: 0,
      body: {
        aggregations: {
          poem_names: {
            terms: {
              field: "poem_name",
            },
            aggregations: {
              poets: {
                terms: {
                  field: "poet",
                },
                aggregations: {
                  publication_year: {
                    terms: {
                      field: "publication_year",
                    },
                    aggregations: {
                      metaphor_type: {
                        terms: {
                          field: "metaphor_type",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    const results = [];
    response.aggregations.poem_names.buckets.forEach((poem) => {
      poem.poets.buckets.forEach((poet) => {
        const entry = {
          poem_name: poem.key,
          poet: poet.key,
          metaphor_count:
            poet.publication_year.buckets[0].metaphor_type.buckets.find(
              (bucket) => bucket.key === "Metaphor"
            ).doc_count,
          metaphorical_count:
            poet.publication_year.buckets[0].metaphor_type.buckets.find(
              (bucket) => bucket.key === "Metaphorical"
            ).doc_count,
          publication_year: poet.publication_year.buckets[0].key,
        };
        results.push(entry);
      });
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
