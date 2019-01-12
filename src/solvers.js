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

  var traverseBoard = function() {
    if (rooksOnBoard.length) {
      var firstX = rooksOnBoard[rooksOnBoard.length - 1][0] + 1;
      var firstY = 0;
    } else {
      var firstX = 0;
      var firstY = 0;
    }
    //Base Case
    if (n === rooksOnBoard.length) {
      solutionCount++;
      return;
    //Recursive Case
    } else {
      for (var x = firstX; x < board.length; x++) {
        for (var y = firstY; y < board.length; y++) {
          boardNode.togglePiece(x, y);

          if (!boardNode.hasAnyRowConflicts() && !boardNode.hasAnyColConflicts()) {
            rooksOnBoard.push([x, y]);
            traverseBoard();
            rooksOnBoard.pop();
          }
          
          boardNode.togglePiece(x, y);
        }
      }
    }
  };
  
  traverseBoard();
  
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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
