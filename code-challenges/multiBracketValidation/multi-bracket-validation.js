'use strict';


function multiBracketValidation(str){

  let regex = '/[](){}]/gm';
  let strClean = str.filter(regex);

  let limit = strClean.length;
  while(strClean.length > 0 || limit === 0){
    for(let i = 0; i < strClean.length; i++){
      if(
        (strClean[i] + strClean[i+1]) === '[]' ||
        (strClean[i] + strClean[i+1]) === '()' ||
        (strClean[i] + strClean[i+1]) === '{}'){
        
        strClean = strClean.splice(i,2);
      }
      if(
        (strClean[i] + strClean[i+1]) === '[}' ||
        (strClean[i] + strClean[i+1]) === '[)' ||
        (strClean[i] + strClean[i+1]) === '{]' ||
        (strClean[i] + strClean[i+1]) === '{)' ||
        (strClean[i] + strClean[i+1]) === '(]' ||
        (strClean[i] + strClean[i+1]) === '(}' ){

        return false;
      }
    }
    limit--;
  }
  if (strClean.length > 0){
    return false;
  }
  return true;
}

module.exports = multiBracketValidation;
