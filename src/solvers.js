/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  /*
  input: n - number of rooks/dimensions
  output: matrix of n arrays in array

  new instance of board(n)
  var rooksOnBoard = [];
  
  function:
  for each row starting at last x
    for each column starting at last y
      togglePiece on board
      apply hasAnyRowConflicts, hasAnyColConflicts()
      if either are true, no bueno
        togglePiece off board
      else keep the piece there
        push [x, y] to rooksonBoard
        if n === rooksOnBoard.length
          define solution as current board and return
        recurse
  
  invoke traversing function
  */

  var boardNode = new Board({n: n});
  var board = boardNode.rows();
  var rooksOnBoard = [];
  var solution; 

  var traverseBoard = function() {
    if (rooksOnBoard.length) {
      var firstX = rooksOnBoard[rooksOnBoard.length - 1][0] + 1;
      var firstY = rooksOnBoard[rooksOnBoard.length - 1][1] + 1;
    } else {
      var firstX = 0;
      var firstY = 0;
    }
    //Base Case
    if (n === rooksOnBoard.length) {
      solution = boardNode.rows();
      return;
    //Recursive Case
    } else {
      for (var x = firstX; x < board.length; x++) {
        for (var y = firstY; y < board.length; y++) {
          boardNode.togglePiece(x, y);

          if (!boardNode.hasAnyRowConflicts() && !boardNode.hasAnyColConflicts()) {
            rooksOnBoard.push([x, y]);
            traverseBoard();
            if (solution) {
              return;
            }
            rooksOnBoard.pop();
          }

          boardNode.togglePiece(x, y);
        }
      }
    }
  };

  traverseBoard();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var boardNode = new Board({n: n});
  var board = boardNode.rows();
  var rooksOnBoard = [];
  var yPieces = [];
  var nIsEven = n % 2 === 0;
  var middle = Math.floor(board.length/2);
  var oddCase = false;

  if (n === 0 || n === 1) {
    return 1;
  }
  
  var traverseBoard = function() {
    //Base Case
    if (n === rooksOnBoard.length) {
      solutionCount++;
      return;
    }

    //Recursive Case
    if (rooksOnBoard.length) {
      var firstX = rooksOnBoard[rooksOnBoard.length - 1][0] + 1;
      var firstY = 0;
    } else {
      var firstX = 0;
      var firstY = 0;
    }
    
    
    for (var x = firstX; x < board.length; x++) {
      if (nIsEven && x === 0) {
        var yLimit = board.length / 2;
      } else { yLimit = board.length; }
      // } else if (!nIsEven && rooksOnBoard[0]) {
      //   if (rooksOnBoard[0][1] === middle) {
      //     oddCase = true;
      //     if (x === 1) {
      //       var yLimit = middle;
      //     } else { var yLimit = board.length; }
      //   }
      // } else { var yLimit = board.length; }

      for (var y = firstY; y < yLimit; y++) {
        if (rooksOnBoard.length === 0 && x > 0) {
          return;
        }
        
        var hasYConflicts = false;
        rooksOnBoard.forEach(function(elem) {
          if (elem[1] === y) {
            hasYConflicts = true;
          }
        });

        if (!hasYConflicts) {
          // boardNode.togglePiece(x, y);

          // if (!boardNode.hasAnyRowConflicts() && !boardNode.hasAnyColConflicts()) {
          rooksOnBoard.push([x, y]);
          yPieces.push(y);
          
          traverseBoard();
          rooksOnBoard.pop();
          // }
          
          // boardNode.togglePiece(x, y);
        }
        
      }
    }
    
  };
  
  traverseBoard();
  if (nIsEven || oddCase) {
    solutionCount *= 2;
  }
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var boardNode = new Board({n: n});
  var board = boardNode.rows();
  var queensOnBoard = [];
  var solution; 
  
  if (n === 2 || n === 3) {
    return board;
  }

  var traverseBoard = function() {
    if (queensOnBoard.length) {
      var firstX = queensOnBoard[queensOnBoard.length - 1][0] + 1;
      var firstY = 0;
    } else {
      var firstX = 0;
      var firstY = 0;
    }
    //Base Case
    if (n === queensOnBoard.length) {
      solution = boardNode.rows();
      return;
    //Recursive Case
    } else {
      for (var x = firstX; x < board.length; x++) {
        for (var y = firstY; y < board.length; y++) {
          boardNode.togglePiece(x, y);

          if (!boardNode.hasAnyRowConflicts() && !boardNode.hasAnyColConflicts() && !boardNode.hasAnyMajorDiagonalConflicts() && !boardNode.hasAnyMinorDiagonalConflicts()) {
            queensOnBoard.push([x, y]);
            traverseBoard();
            if (solution) {
              return;
            }
            queensOnBoard.pop();
          }

          boardNode.togglePiece(x, y);
        }
      }
    }
  };

  traverseBoard();


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var boardNode = new Board({n: n});
  var board = boardNode.rows();
  var queensOnBoard = [];

  var traverseBoard = function() {
    if (queensOnBoard.length) {
      var firstX = queensOnBoard[queensOnBoard.length - 1][0] + 1;
      var firstY = 0;
    } else {
      var firstX = 0;
      var firstY = 0;
    }
    //Base Case
    if (n === queensOnBoard.length) {
      solutionCount++;
      return;
    //Recursive Case
    } else {
      for (var x = firstX; x < board.length; x++) {
        for (var y = firstY; y < board.length; y++) {
          boardNode.togglePiece(x, y);

          if (!boardNode.hasAnyRowConflicts() && !boardNode.hasAnyColConflicts() && !boardNode.hasAnyMajorDiagonalConflicts() && !boardNode.hasAnyMinorDiagonalConflicts()) {
            queensOnBoard.push([x, y]);
            traverseBoard();
            queensOnBoard.pop();
          }
          
          boardNode.togglePiece(x, y);
        }
      }
    }
  };
  
  traverseBoard();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
