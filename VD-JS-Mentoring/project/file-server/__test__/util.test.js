const { stat } = require('../utility/util');

test('stat valid file with 4096 blocks', async () => {
  expect(await stat('ENV_EXAMPLE')).toHaveProperty('blksize',4096);
});

test('stat invalid file', async () => {
    try{
        await stat('ENV_EXAMPLE_NON')
    }catch(e){
        expect(e).toHaveProperty('errno',-2);
    }    
});