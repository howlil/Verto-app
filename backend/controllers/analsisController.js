const prisma = require('../config/prisma');
exports.analisisTopsis = async (req,res)=>{
  try {

    const { data, weights, criteriaTypes } = req.body;

    // Step 1: Normalize the matrix
    let m = new Matrix(data);
    let normArray = m.cols().map(col => 
        Math.sqrt(col.map(value => value ** 2).reduce((acc, curr) => acc + curr, 0))
    );

    let normMatrix = new Matrix(normArray.map(norm => Array(m.rows).fill(1 / norm)));
    let normalizedMatrix = m.div(normMatrix);

    // Step 2: Apply weights
    let weightMatrix = new Matrix(weights.map(weight => Array(m.rows).fill(weight)));
    let weightedNormalizedMatrix = normalizedMatrix.mul(weightMatrix);

    // Step 3: Construct ideal and negative ideal solutions
    let idealSolution = [];
    let negativeIdealSolution = [];
    weightedNormalizedMatrix.cols().forEach((col, index) => {
        if (criteriaTypes[index] === 'BENEFIT') {
            idealSolution.push(Math.max(...col));
            negativeIdealSolution.push(Math.min(...col));
        } else {
            idealSolution.push(Math.min(...col));
            negativeIdealSolution.push(Math.max(...col));
        }
    });

    // Step 4: Calculate distances to both ideal solutions and overall preference score
    let distancesToIdeal = weightedNormalizedMatrix.rows().map(row => 
        Math.sqrt(row.map((value, index) => (value - idealSolution[index]) ** 2).reduce((acc, curr) => acc + curr, 0))
    );

    let distancesToNegativeIdeal = weightedNormalizedMatrix.rows().map(row => 
        Math.sqrt(row.map((value, index) => (value - negativeIdealSolution[index]) ** 2).reduce((acc, curr) => acc + curr, 0))
    );

    let performanceScores = distancesToNegativeIdeal.map((distanceToNegative, index) => ({
        score: distanceToNegative / (distancesToIdeal[index] + distanceToNegative),
        alternative: req.body.alternatives[index]  // Assuming alternatives array is passed in the request
    }));

    // Step 5: Sort and return the results
    performanceScores.sort((a, b) => b.score - a.score);

    res.json(performanceScores);
    
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });

  }
}