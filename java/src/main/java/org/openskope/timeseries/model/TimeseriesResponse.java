package org.openskope.timeseries.model;

import java.util.Map;

public class TimeseriesResponse {
	
	private String datasetId;
	private String variableName;
	private Map<String, Object> boundaryGeometry;
	private String start;
	private String end;
	private int startIndex;
	private int endIndex;
    private Number[] values;
    private Number[] upperBounds;
    private Number[] lowerBounds;
    private String csv;
    private Number nodata;
    private boolean containsNodata;

	@SuppressWarnings("unchecked")
	public TimeseriesResponse(
			String datasetId, 
			String variableName, 
			Map<String, Object> boundaryGeometry,
			String start,
			String end,
			int startIndex,
			int endIndex,
			Number[] values,
			Number[] upperBounds,
			Number[] lowerBounds,
			String csv,
			Number nodata,
			boolean containsNodata
		) {
		this.datasetId = datasetId;
		this.variableName = variableName;
        this.boundaryGeometry = (Map<String,Object>) boundaryGeometry.get("geometry");
        this.start = start;
        this.end = end;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.values = values;
        this.upperBounds = upperBounds;
        this.lowerBounds = lowerBounds;
        this.csv = csv;
        this.nodata = nodata;
        this.containsNodata = containsNodata;
    }

	public String getDatasetId() { return datasetId; }
	public String getVariableName() { return variableName; }
	public Number[] getValues() { return this.values; }
	public Number[] getUpperBounds() { return this.upperBounds; }
	public Number[] getLowerBounds() { return this.lowerBounds; }
	public String getCsv() { return this.csv; }
	public String getStart() { return start; }
	public String getEnd() { return end; }
	public Integer getStartIndex() { return startIndex; }
	public Integer getEndIndex() { return endIndex; }
	public boolean getContainsNodata() { return containsNodata; }
	public Number getNodata() { return nodata; }
	public Map<String,Object>  getBoundaryGeometry() { return boundaryGeometry; }	
}
