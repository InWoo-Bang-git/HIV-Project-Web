var constants = require("../consts");
const fs = require("fs");
const path = require("path");
var ObjectId = require("mongoose").Types.ObjectId;

async function seeedData(db) {
  console.log("seeding data");
  const contentModel = db.model(constants.SCHMA_NAMES.content);
  await seedContentData(contentModel);
  const topicModel = db.model(constants.SCHMA_NAMES.topic);
  await seedTopicData(topicModel);
  const bookMarkModel = db.model(constants.SCHMA_NAMES.bookMark);
  await seedBookMarkData(bookMarkModel);
}

async function seedContentData(contentModel) {
  const html1 = fs
    .readFileSync(path.resolve(__dirname, "article1.html"), "utf8")
    .replace(/\n/g, "");
  const html2 = fs
    .readFileSync(path.resolve(__dirname, "article2.html"), "utf8")
    .replace(/\n/g, "");
  const html3 = fs
    .readFileSync(path.resolve(__dirname, "article3.html"), "utf8")
    .replace(/\n/g, "");
  const html4 = fs
    .readFileSync(path.resolve(__dirname, "article4.html"), "utf8")
    .replace(/\n/g, "");
  const placeHolderHTML = fs
    .readFileSync(path.resolve(__dirname, "placeholder.html"), "utf8")
    .replace(/\n/g, "");

  const contentData = [
    {
      _id: "645c72da98cbed78ec205585",
      name: "About HIV/AIDS",
      content: html1,
      meta: {
        sections: [
          {
            id: new ObjectId(),
            name: "What are HIV and AIDS?",
            href: "#sec1",
          },
          {
            id: new ObjectId(),
            name: "How does HIV spread?",
            href: "#sec2",
          },
        ],
      },
    },
    {
      _id: "645c72da98cbed78ec205595",
      name: "Symptoms of HIV",
      content: html2,
      meta: {
        sections: [
          {
            id: new ObjectId(),
            name: "What does HIV do to your body?",
            href: "#sec1",
          },
          {
            id: new ObjectId(),
            name: "Stages of HIV?",
            href: "#sec2",
          },
        ],
      },
    },
    {
      _id: "645c72da98cbed78ec205586",
      name: "How to get tested for HIV",
      content: html3,
      meta: {
        sections: [
          {
            id: new ObjectId(),
            name: "How to get tested for HIV in australia?",
            href: "#sec1",
          },
        ],
      },
    },
    {
      _id: "645c72da98cbed78ec205596",
      name: "HIV treatments & side effects",
      content: html4,
      meta: {
        sections: [
          {
            id: new ObjectId(),
            name: "Why test for HIV?",
            href: "#sec1",
          },
          {
            id: new ObjectId(),
            name: "Common antiretroviral drugs",
            href: "#sec2",
          },
        ],
      },
    },
    {
      _id: "645c72da98cbed78ec205599",
      name: "About HIV/AIDS",
      content: placeHolderHTML,
      meta: {
        sections: [
          {
            id: new ObjectId(),
            name: "What are HIV and AIDS?",
            href: "#sec1",
          },
          {
            id: new ObjectId(),
            name: "How does HIV spread?",
            href: "#sec2",
          },
        ],
      },
    },
  ];
  await contentModel.deleteMany({});
  await contentModel.insertMany(contentData);
}

async function seedTopicData(topicModel) {
  const topicData = [
    {
      _id: new ObjectId(),
      name: "Understanding HIV",
      description:
      "We break down the facts in a simple, accessible way, ensuring you have a clear understanding of the virus and its implications.",
      sub_topics: [
        {
          _id: new ObjectId("645c72da98cbec78ec205585"),
          name: "About HIV/AIDS",
          content_id: "645c72da98cbed78ec205585",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec205586"),
          name: "Symptoms of HIV",
          content_id: "645c72da98cbed78ec205595",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec205587"),
          name: "How to get tested for HIV",
          content_id: "645c72da98cbed78ec205586",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec205588"),
          name: "HIV treatments & side effects",
          content_id: "645c72da98cbed78ec205596",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec205589"),
          name: "HIV stigma and discrimination",
          content_id: "645c72da98cbed78ec205599",
        },
      ],
    },
    {
      _id: new ObjectId(),
      name: "Information about STI's",
      description:"Learn about effective prevention strategies, from safe practices to pre-exposure prophylaxis (PrEP). Together, we can reduce new infections and create a healthier future.",
      sub_topics: [
        {
          _id: new ObjectId("645c72da98cbec78ec206589"),
          name: "What are STI's and BBVs",
          content_id: "645c72da98cbed78ec205599",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec207589"),
          name: "How are STIs and BBVs spread",
          content_id: "645c72da98cbed78ec205599",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec208589"),
          name: "How can i lower my risk of getting STIs and BBVs",
          content_id: "645c72da98cbed78ec205599",
        },
        {
          _id: new ObjectId("645c72da98cbec78ec209989"),
          name: "How would i know if I have an STI or a BBV",
          content_id: "645c72da98cbed78ec205599",
        },
      ],
    },
    {
      _id: new ObjectId(),
      name: "Living Well with HIV",
      description:"Explore stories of resilience, access information about treatments, and understand how medical advancements have transformed HIV into a manageable condition.",
      sub_topics: [],
    },
    {
      _id: new ObjectId(),
      name: "Support and Community",
      description:"Discover resources for emotional support, find local organisations, and connect with a community that understands and uplifts each other.",
      sub_topics: [],
    },
  ];
  await topicModel.deleteMany({});
  await topicModel.insertMany(topicData);
}

async function seedBookMarkData(bookMarkModel) {
  const bookMarkData = [
    {
      _id: new ObjectId(),
      user_id: "001",
      bookMarks: [
        {
          _id: new ObjectId(),
          name: "About HIV/AIDS",
          content_id: "645c72da98cbec78ec205585",
        },
      ],
    },
  ];
  await bookMarkModel.deleteMany({});
  await bookMarkModel.insertMany(bookMarkData);
}

module.exports = seeedData;
