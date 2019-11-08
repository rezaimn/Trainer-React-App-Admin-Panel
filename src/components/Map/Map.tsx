import React, {Component} from "react";
import GoogleMapReact from "google-map-react";


interface IProps {
    className?: string;
    onCompleteSelect?: (data: any) => void;
    query?: string;
    geometry?: any[];
    geometries?: any[];
    zoom?: number;
}


class Map extends Component<IProps> {

    service: any = null
    google: any = null
    map: any = null
    areaPolygons: any[] = [];

    componentWillUnmount() {
        this.clearPolygons();
    }

    componentWillReceiveProps = (nextProps: any) => {
        if (nextProps.query !== this.props.query) {
            this.findPlaceFromQuery(nextProps.query || '')
        }
        if (nextProps.geometry && this.google) {
            this.showPlygon(nextProps.geometry)
        }

        if(nextProps.geometries && this.google){

            this.showAreas(nextProps.geometries)
        }
    };

    findPlaceFromQuery = (query) => {
        if (this.service) {
            var request = {
                query: query || '',
                fields: ['name', 'geometry'],
            };
            this.service.findPlaceFromQuery(request, (results, status) => {
                if (status === this.google.maps.places.PlacesServiceStatus.OK) {

                    this.google.map.setCenter(results[0].geometry.location);
                } else if(status === this.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT){
                    
                }
            });
        }
    }

    
    handleGoogleMapApi = google => {
        let selectedShape : any= null;

        // set initial google
        this.google = google;
        

        const map = google.map;
        this.map = map;


        // initital service for lib place
        this.service = new google.maps.places.PlacesService(map);
        if(this.props.geometry){
            this.showPlygon(this.props.geometry)
        }
        

        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            },
            markerOptions: {
                icon:
                    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            },
            circleOptions: {
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });

        google.maps.event.addListener(drawingManager, "overlaycomplete", (e: any) => {
            
            let shape = e.overlay;
            shape.type = e.type;

            // for clear selected polygon
            if(selectedShape){
                selectedShape.setMap(null);
            }
            
            let paths: any = e.overlay.getPaths();
            let  geometry: any[] = [];
            paths = paths.getArray ? paths.getArray() : paths;

            paths.forEach ( path => {
                geometry.push(this.getListPaths(path));
            })
            selectedShape = shape;
            this.props.onCompleteSelect && this.props.onCompleteSelect(geometry)
            
        });

        drawingManager.setMap(map);
    };

    getListPaths = (paths: any) => {
        paths = paths.getArray ? paths.getArray() : paths;
        let items: any[] = [];

        paths.forEach( path => {
            items.push(this.getLatLng(path));
        })
        
        return items;
    };

    getLatLng = (latLng: any) => {
        return [latLng.lat(), latLng.lng()];
    };


    showPlygon = (paths: any) => {
        var shape: any =[];
        paths.forEach( path => {
            shape.push(this.setLatLng(path));
        })

        let tmp=new this.google.maps.Polygon({paths: shape});
        tmp.setValues({map:this.map, id:1})
        return tmp;
    }

    showAreas = (areas: any[]) => {
        this.clearPolygons();
        areas.forEach(area => {
            this.areaPolygons.push(this.showPlygon(area));
        })
    }

    clearPolygons = () =>{
        this.areaPolygons.forEach(area => area.setMap(null));
        this.areaPolygons = [];
    }

    setLatLng = (latlng: any[]) => {
        return new this.google.maps.LatLng(latlng[0],latlng[1]);
    }

    shouldComponentUpdate(nextProps){
        //Sajad
        //TODO: component render twice and make polygon darker
        if(this.props.geometry !== nextProps.geometry){
            return true;
        }
        return false;
    }

    render() {
        const { 
            className,
            zoom
        } = this.props;
        const bootstrapURLKeys = {
            key: "AIzaSyACckusHX9FL5LLcLfNvrOwxQQ-pBbwUDw",
            libraries: ["drawing", "places"].join(",")
        };
        return (
            <div style={{ height: "100vh", width: "100%" }}  className={className} >
                <GoogleMapReact
                    bootstrapURLKeys={bootstrapURLKeys}
                    defaultCenter={{
                        lat: 36.778259,
                        lng: -119.417931
                    }}
                    defaultZoom={zoom || 8}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={this.handleGoogleMapApi}
                />
            </div>
        );
    }
}

export { Map };
