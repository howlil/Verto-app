const prisma = require("../config/prisma");
const { alternatif } = require("../routes");
const linearAlgebra = require("linear-algebra")();
const Matrix = linearAlgebra.Matrix;

exports.analisisTopsis = async (req, res) => {
  try {
    const { data, weights, criteriaTypes } = req.body;

    // Step 1: Normalize the matrix
    let m = data;
    let w = weights;
    let ia = criteriaTypes.map((type) => (type === "COST" ? "min" : "max"));

    // Calculating normalisasi matrix

    let norm = 0;
    const normArray = [];

    for (let j = 0; j < m[0].length; j++) {
      for (let i = 0; i < m.length; i++) {
        const num = m[i][j];
        norm += num ** 2;
      }

      norm = Math.sqrt(norm);
      normArray.push(norm);
      norm = 0;
    }

    let mNormArray = [];

    i = 0;

    for (let i = 0; i < m.length; i++) {
      mNormArray.push([...normArray]);
    }
    mNormArray = new Matrix(mNormArray);

    console.log("normArray", normArray);

    // Normalised Alternative Matrix

    let nm = m.map((row, i) =>
      row.map((value, j) => value / mNormArray.data[i][j])
    );

    console.log("R", nm);

    // Weighted normalised alternative matrix

    let ev = [];

    for (let i = 0; i < m.length; i++) {
      ev.push([...w]);
    }

    let evMatrix = new Matrix(ev);

    // Weighted normalised alternative matrix
    let wnm = nm.map((row, i) =>
      row.map((value, j) => value * evMatrix.data[i][j])
    );

    console.log("ini Y", wnm);

    // Computing ideal and anti-ideal solution

    i = 0; // Rows
    j = 0; // Columns
    let a = 0; // iterations
    let attributeValues = [];
    const idealSolution = [];
    const aidealSolution = [];
    let attributeFunction = null;

    for (let a = 0; a < 2; a++) {
      for (let j = 0; j < m[0].length; j++) {
        for (let i = 0; i < m.length; i++) {
          attributeValues.push(wnm[i][j]);
        }

        if (a === 0) {
          if (ia[j] === "min") {
            attributeFunction = Math.min(...attributeValues);
            idealSolution.push(attributeFunction);
          } else if (ia[j] === "max") {
            attributeFunction = Math.max(...attributeValues);
            idealSolution.push(attributeFunction);
          }
        } else if (a === 1) {
          if (ia[j] === "min") {
            attributeFunction = Math.max(...attributeValues);
            aidealSolution.push(attributeFunction);
          } else if (ia[j] === "max") {
            attributeFunction = Math.min(...attributeValues);
            aidealSolution.push(attributeFunction);
          }
        }

        attributeValues = [];
      }
    }

    console.log("A+", idealSolution);
    console.log("A-", aidealSolution);

    // Calculate distance to ideal and antiideal solution
    i = 0; // Rows
    j = 0; // Cols
    a = 0;

    const listIdeal = [];
    const listaIdeal = [];
    let distToI = 0;
    let distToaI = 0;

    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < m.length; i++) {
        distToI = 0;
        distToaI = 0;
        for (let j = 0; j < m[0].length; j++) {
          if (a === 0) {
            distToI += (wnm[i][j] - idealSolution[j]) ** 2;
          } else {
            distToaI += (wnm[i][j] - aidealSolution[j]) ** 2;
          }
        }

        if (a === 0) {
          distToI = Math.sqrt(distToI);
          listIdeal.push(distToI);
        } else {
          distToaI = Math.sqrt(distToaI);
          listaIdeal.push(distToaI);
        }
      }
    }

    console.log("D+", listIdeal);
    console.log("D-", listaIdeal);

    i = 0;
    const listedPerformancedScore = [];
    let performanceScore = null;
    for (i = 0; i < m.length; i += 1) {
      performanceScore = listaIdeal[i] / (listIdeal[i] + listaIdeal[i]);
      listedPerformancedScore.push(performanceScore);
    }

    console.log("v", listedPerformancedScore);

    const indexedPerformanceScore = [];
    i = 0;
    for (i = 0; i < m.length; i += 1) {
      const dp = {
        index: i,
        data: m[i],
        ps: listedPerformancedScore[i],
      };
      indexedPerformanceScore.push(dp);
    }
    console.log(indexedPerformanceScore);

    let performanceScores = indexedPerformanceScore.map((item) => {
      return {
        alternative: item.data,
        score: item.ps,
      };
    });

    const result = await prisma.result.create({
      data: {
        normalizedMatrix: nm,
        weightedNormalizedMatrix: wnm,
        idealSolution: idealSolution,
        negativeIdealSolution: aidealSolution,
        distancesToIdeal: listIdeal,
        distancesToNegativeIdeal: listaIdeal,
        PerformanceScores: {
          create: performanceScores,
        },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "berhasil", result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.showTopsisData = async (req, res) => {
  let data, result;
  try {
    result = await prisma.result.findMany();
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching results",
      error: error.message,
    });
  }

  try {
    data = await prisma.PerformanceScore.findMany();
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching performance scores",
      error: error.message,
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "berhasil", result: result, data: data });
};
