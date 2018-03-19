const rest = require('rest');
const mime = require('rest/interceptor/mime');

const timeseriesServiceBase = 'http://localhost:8001/timeseries-service/api/v1';

const callRESTService =  rest.wrap(mime, { mime: 'application/json' } );


describe("When a values POST request uses the query line only to request first pixel of each band in 5x5x5 data cube", async () => {
    
	var response;
	
	beforeAll(async () => {
		response = await callRESTService({
		    method: 'POST',
		    path: timeseriesServiceBase + '/values?datasetId=5x5x5&variableName=temp&longitude=-123.0&latitude=45.0&start=0&end=4',
		    entity: {}
		});
    });

    it ('HTTP response status code should be 200 - success', async function() {
        expect(response.status.code).toBe(200);
    });

    it ('Dataset id should match that in the request', async function() {
        expect(response.entity.datasetId).toBe('5x5x5');
    });

	it ('Variable name should match that in the request', async function() {
        expect(response.entity.variableName).toBe('temp');
    });

	it ('Boundary geometry type should be point', async function() {
        expect(response.entity.boundaryGeometry.type).toBe('Point');
    });

    it ('Boundary geometry coordinates should be array with requested lat and lng ', async function() {
        expect(response.entity.boundaryGeometry.coordinates).toEqual( [-123, 45] );
    });

    it ('Series range start and end should match the request', async function() {
        expect(response.entity.range.start).toEqual( 0 );
        expect(response.entity.range.end).toEqual( 4 );
    });
    
    it ('Values should be an array with one element for the first pixel of each band', async function() {
        expect(response.entity.values).toEqual( [100,200,300,400,500] );
    });

});

describe("When a values POST request provides the dataset id both in the request body and on the query line", async () => {
    
	var response;
	
	beforeAll(async () => {
		response = await callRESTService({
		    method: 'POST',
		    path: timeseriesServiceBase + '/values?datasetId=not-a-dataset&variableName=temp&longitude=-123.0&latitude=45.0&start=0&end=4',
		    entity: {
		    	datasetId: '5x5x5'
		    }
		});
    });

    it ('HTTP response status code should be 200 - success', async function() {
        expect(response.status.code).toBe(200);
    });

    it ('Dataset id in response should match that in the request body', async function() {
        expect(response.entity.datasetId).toBe('5x5x5');
    });

});

describe("When a values POST request provides the variable name both in the request body and on the query line", async () => {
    
	var response;
	
	beforeAll(async () => {
		response = await callRESTService({
		    method: 'POST',
		    path: timeseriesServiceBase + '/values?datasetId=5x5x5&variableName=not-a-variable&longitude=-123.0&latitude=45.0&start=0&end=4',
		    entity: {
		    	variableName: 'temp'
		    }
		});
    });

    it ('HTTP response status code should be 200 - success', async function() {
        expect(response.status.code).toBe(200);
    });

    it ('Variable name in response should match that in the request body', async function() {
        expect(response.entity.variableName).toBe('temp');
    });

});

describe("When a values POST request provides the coordinates both in the request body and on the query line", async () => {
    
	var response;
	
	beforeAll(async () => {
		response = await callRESTService({
		    method: 'POST',
		    path: timeseriesServiceBase + '/values?datasetId=5x5x5&variableName=temp&longitude=0.0&latitude=0.0&start=0&end=4',
		    entity: {
		    	boundaryGeometry: {
		    		type: 'Point',
		    		coordinates: [-123, 45]
		    	}
	    	}
		});
    });

    it ('HTTP response status code should be 200 - success', async function() {
        expect(response.status.code).toBe(200);
    });

    it ('Boundary geometry coordinates should match those given in request body', async function() {
        expect(response.entity.boundaryGeometry.coordinates).toEqual( [-123, 45] );
    });
});


describe("When a values POST request provides the band range both in the request body and on the query line", async () => {
    
	var response;
	
	beforeAll(async () => {
		response = await callRESTService({
		    method: 'POST',
		    path: timeseriesServiceBase + '/values?datasetId=5x5x5&variableName=temp&longitude=-123.0&latitude=45.0&start=5&end=10',
		    entity: {
		    	start: 0,
		    	end: 4
	    	}
		});
    });

    it ('HTTP response status code should be 200 - success', async function() {
        expect(response.status.code).toBe(200);
    });

});
