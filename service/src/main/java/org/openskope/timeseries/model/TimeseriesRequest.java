package org.openskope.timeseries.model;

import java.util.ArrayList;
import java.util.Map;

import org.openskope.timeseries.controller.MissingPropertyException;

public class TimeseriesRequest {
	
	private String datasetId;
	private String variableName;
	private Map<String,Object> boundaryGeometry;
	private Number latitude;
	private Number longitude;
	private String start;
	private String end;
	private ArrayList coordinates;
	private String boundaryGeometryType;
	
	public TimeseriesRequest() {}
	
	public TimeseriesRequest(
			String datasetId, 
			String variableName, 
			String latitude, 
			String longitude, 
			String start,
			String end
		) {
		this.datasetId = datasetId;
		this.variableName = variableName;
        this.latitude = Double.parseDouble(latitude);
        this.longitude = Double.parseDouble(longitude);
        this.start = start;
        this.end = end;
    }

	public void setBoundaryGeometry(Map<String,Object> boundaryGeometry) {

		this.boundaryGeometry = boundaryGeometry;
		
		boundaryGeometryType = (String) boundaryGeometry.get("type");
		coordinates = (ArrayList) boundaryGeometry.get("coordinates");
		
		if (coordinates != null && boundaryGeometryType != null) {
			if (boundaryGeometryType.equals("Point")) {
				this.longitude = (Number) coordinates.get(0);
				this.latitude  = (Number) coordinates.get(1);
			}
		}
	}
	
	public void setRange(Map<String,String> range) {
		this.start = range.get("start");
		this.end   = range.get("end");
	}
	
	public void validate() throws Exception {
		if (datasetId == null) throw new MissingPropertyException("datasetId");
		if (variableName == null) throw new MissingPropertyException("variableName");
		if (boundaryGeometry == null) throw new MissingPropertyException("boundaryGeometry");
		if (boundaryGeometryType == null) throw new MissingPropertyException("boundaryGeometry.type");
		if (coordinates == null) throw new MissingPropertyException("boundaryGeometry.coordinates");
	}

	public String getDatasetId() { return datasetId; }
	public String getVariableName() { return variableName; }
	public double getLatitude() { return latitude.doubleValue(); }
	public double getLongitude() { return longitude.doubleValue(); }
	public String getStart() { return start; }
	public String getEnd() { return end; }
}