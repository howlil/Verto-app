const prisma = require('../config/prisma');

exports.createAnalsis = async (req, res) => {
    try {

      /**
       * TOPSIS 
       * 
       * 
       * 
i want to create dss system rest API use express js so, i have done created  
- CRUD alternatif from this schemer
model Alternatif {
  id                String  @id @default(cuid())
  nama        String
  createdAt   DateTime     @default(now())
  Penilaians  Penilaian[]
}
- CRUD kriteria from this scheme
model Kriteria {
  id              String          @id @default(cuid())
  nama            String
  bobot           Float
  tipe            Tipe
  DetailKriterias DetailKriteria[]
  Penilaian       Penilaian[]
}
enum Tipe {
  COST
  BENEFIT
    }

- CRUD detail kriteria
model DetailKriteria {
  id                String  @id @default(cuid())
  id_kriteria       String
  deskripsi         String
  nilai             Int
  createdAt         DateTime    @default(now())
  Kriteria          Kriteria    @relation(fields: [id_kriteria], references: [id])
  Penilaians        Penilaian[]
}

- - CRUD penilaian from this scheme
model Penilaian {
  id                String  @id @default(cuid())
  id_detail_kriteria  String
  id_kriteria         String
  id_alternatif       String
  Hasils              Hasil[]
  Alternatif          Alternatif      @relation(fields: [id_alternatif], references: [id])
  DetailKriteria      DetailKriteria  @relation(fields: [id_detail_kriteria], references: [id])
  Kriteria            Kriteria        @relation(fields: [id_kriteria], references: [id])
}
-- crud hasil
 id                String  @id @default(cuid())
  id_penilaian   String
  ranking        Int
  nilai          Float
  userId         String
  Penilaian      Penilaian @relation(fields: [id_penilaian], references: [id])
  User           User      @relation(fields: [userId], references: [id])
}

 from post penilaian i got response like this

     "data": [
        {
            "id": "clw1pg4d900016p9jbk82ltwc",
            "id_detail_kriteria": "clw1p5ag900085bvlmar5row2",
            "id_kriteria": "clw1p2exo00065bvlj61wejtj",
            "id_alternatif": "clw1p60fn000b5bvl16vrb033",
            "DetailKriteria": {
                "nilai": 1,
                "deskripsi": "Sering"
            },
            "Alternatif": {
                "nama": "dulrb"
            },
            "Kriteria": {
                "nama": "Demografi",
                "tipe": "BENEFIT",
                "bobot": 2.25
            }
        },
        {
            "id": "clw1q21ze0005zu7a6n0mufx1",
            "id_detail_kriteria": "clw1q11vp0003zu7adxj8vjkb",
            "id_kriteria": "clw1p2exo00065bvlj61wejtj",
            "id_alternatif": "clw1p5r1000095bvlcau0gowg",
            "DetailKriteria": {
                "nilai": 2,
                "deskripsi": "jarang"
            },
            "Alternatif": {
                "nama": "Ulil"
            },
            "Kriteria": {
                "nama": "Demografi",
                "tipe": "BENEFIT",
                "bobot": 2.25
            }
        }
    ]


    for post into analisis API
    i want to convert that respone into array row is amount alternatif , and kolom is amount of kriteria.
    so the value this array is detaikriteria.nilai, the position we can get based on array [amount_alternatif][amount_kriteria].
    for weight , we can get from kriteria.bobot , get into array too. and consider COST BENEFIT in kriteria based on kiteria.bobot

    
    so i got algorithm topsis in NPM install topsis , but iwant costumize to get show
       detail every process. dependecis use linear-algebra especially matrix
}
       1. normalize performance values in columns as follows


      
    
         let j; // Cols
    i = 0; // Rows
    let norm = 0;
    const normArray = [];
  
    for (j = 0; j < m.cols; j += 1) {
      for (i = 0; i < m.rows; i += 1) {
        const num = m.data[i][j];
        norm = (num ** 2) + norm;
      }
  
      norm = (Math.sqrt(norm) * 100) / 100;
      normArray.push(norm);
      norm = 0;
    }

    console.log("ini norma Array ", normArray);

    let mNormArray = [];
  
    i = 0;
  
    for (i = 0; i < m.rows; i += 1) {
      mNormArray.push(normArray);
    }
  
    mNormArray = new Matrix(mNormArray);
  
    // Normalised Alternative Matrix
  
    let nm = [];
  
    nm = m.div(mNormArray);

       2.  Calculate weighted normalized values (they are simply normalized values matrix multiplied by weights vector)

    let ev = [];
    i = 0;
    for (i = 0; i < m.rows; i += 1) {
      ev.push(w);
    }
  
    ev = new Matrix(ev);
  
    const wnm = nm.mul(ev);

       3. onstruct positive and negative ideal variants. By ideal solution in TOPSIS we mean virtual variant having all minimum or maximum weighted corresponding values for all features. Here we have to take into account if the attribute is benefit or cost. So positive ideal solution will contain all maximum values from benefit features and minimum values from cost features, and vice versa for negative ideal solution.
        
     // Computing ideal and anti-ideal solution
  
    i = 0; // Rows
    j = 0; // Columns
    let a = 0; // iterations
    let attributeValues = [];
    const idealSolution = [];
    const aidealSolution = [];
    let attributeFunction = null;
  
    for (a = 0; a < 2; a += 1) {
      for (j = 0; j < m.cols; j += 1) {
        for (i = 0; i < m.rows; i += 1) {
          attributeValues.push(wnm.data[i][j]);
        }
  
        if (a === 0) {
          if (ia[j] === 'min') {
            attributeFunction = Math.min(...attributeValues);
            idealSolution.push(attributeFunction);
          } else if (ia[j] === 'max') {
            attributeFunction = Math.max(...attributeValues);
            idealSolution.push(attributeFunction);
          }
        } else if (a === 1) {
          if (ia[j] === 'min') {
            attributeFunction = Math.max(...attributeValues);
            aidealSolution.push(attributeFunction);
          } else if (ia[j] === 'max') {
            attributeFunction = Math.min(...attributeValues);
            aidealSolution.push(attributeFunction);
          }
        }
  
        attributeValues = [];
      }
      j = 0;
    }
  


       4.  Calculate dinstaces to both ideal solutions and overall preference score
     
 // Calculate distance to ideal and antiideal solution
    i = 0; // Rows
    j = 0; // Cols
    a = 0;
  
    const listIdeal = [];
    const listaIdeal = [];
    let distToI = 0;
    let distToaI = 0;
  
    for (a = 0; a < 2; a += 1) {
      for (i = 0; i < m.rows; i += 1) {
        distToI = 0;
        distToaI = 0;
        for (j = 0; j < m.cols; j += 1) {
          if (a === 0) {
            distToI += ((wnm.data[i][j] - idealSolution[j]) ** 2);
          } else {
            distToaI += ((wnm.data[i][j] - aidealSolution[j]) ** 2);
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

    i = 0;
    const listedPerformancedScore = [];
    let performanceScore = null;
    for (i = 0; i < m.rows; i += 1) {
      performanceScore = listaIdeal[i] / (listIdeal[i] + listaIdeal[i]);
      listedPerformancedScore.push(performanceScore);
    }
  
   console.log("listedPerformancedScore",listedPerformancedScore);

    const indexedPerformanceScore = [];
    i = 0;
    for (i = 0; i < m.rows; i += 1) {
      const dp = {
        index: i,
        data: m.data[i],
        ps: listedPerformancedScore[i],
      };
      indexedPerformanceScore.push(dp);
    }

        5. give a list name and value analisis, sort them descending


    const rankedPerformanceScore = indexedPerformanceScore.sort(sortedBy('ps'));
    console.log("rankedPerformanceScore",rankedPerformanceScore);
    return rankedPerformanceScore;
    function sortedBy(elm) {
    return function order(a, b) {
      if (b[elm] > a[elm]) {
        return 1;
      } if (b[elm] < a[elm]) {
        return -1;
      }
      return 0;
    };
} 


       */
        

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create DetailKriteria', error: error.message });
    }
}