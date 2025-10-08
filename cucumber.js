module.exports = {
  default: {
    require: [
      'tests/steps/**/*.ts',
      'tests/support/hooks.ts',    
      'tests/support/world.ts'    
    ],
    requireModule: ['ts-node/register'],  
    // paths: ['tests/features/**/*.feature'], 
    format: [
      'progress',                      
      'json:reports/cucumber-report.json'   
    ],
    publishQuiet: true
  }
};
