import React, {Component} from "react";
import {CardContainer} from "../../components";
import Select from "react-select";
import {NameDropDown} from "../../constants";
import {IProps, IState, TypeRoute} from "./FranchiseContainer";
import {toast} from "react-toastify";
import FormFranchise from './FormFranchise'
import TableFranchise from './TableFranchise'


class Franchise extends Component<IProps, IState> {
    listGeometry: any = [];
    fromRoute: TypeRoute = TypeRoute.fromList;
    state = {
        name: "",
        query: "",
        country_id: 0,
        state_id: 0,
        city_id: 0,
        filters: {
            role: 'FA',
            status: null,
            email: '',
            fullname: '',
            zipcode: '',
            searchable: null,
            userPackage: '',
            registerDate: '',
        },

    };
    // selectedGeo: IGeo = {
        // country_id: 0,
        // state_id: 0,
        // city_id: 0,
        // admin_id: 0
    // };

    constructor(props) {
        super(props);
        this.props.clearGeoDataAction();
        // check role
        const pathname = this.props.history.location.pathname;
        switch(pathname){
            case TypeRoute.fromCreate:
                this.fromRoute = TypeRoute.fromCreate;
                break;
            case TypeRoute.fromEdit:
                this.fromRoute = TypeRoute.fromEdit;
                break;
            case TypeRoute.fromList:
                this.fromRoute = TypeRoute.fromList;
                break;
            default:
                if((''+pathname).includes(TypeRoute.fromEdit)) 
                    this.fromRoute = TypeRoute.fromEdit;
                break;
        }
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.current && nextProps.current !== this.props.current){
            this.listGeometry = [nextProps.current.geometry];
            this.setState({
                name: nextProps.current.name,
                city_id: nextProps.current.city.id,
                country_id: nextProps.current.city.State.Country.id,
                state_id: nextProps.current.city.State.id,
                query: nextProps.current.city.name,
            });
            this.props.franchiseListAction(nextProps.current.city.id)
        }
    };

    componentDidMount = () => {
        //get all franchises
        //@ToDo: change if to prevent load all franchises in the map just in edit page.
        if(this.fromRoute === TypeRoute.fromList)
            this.props.franchiseListAction()

        // get initial list of country
        this.props.franchiseListAction();
        this.props.countryListAction(true);
        this.props.franchiseResetAction();
        // this.props.getUserFranchisesBaseOnRoleAction();

        if(this.fromRoute !== TypeRoute.fromList){
            // get initial list of Franchise Admin
            this.props.getListUserAction(this.state.filters);
        }

        if(this.fromRoute === TypeRoute.fromEdit){
            this.props.getFranchiseByIdAction(this.props.match.params.id);
        }
        
    };
    dropDownItem = (item, value) => {
        switch (value.name) {
            case NameDropDown.country_id:
                this.props.stateListAction(item["id"], true);
                this.setState({country_id: item["id"]})
                // this.selectedGeo.country_id = item["id"];
                break;
            case NameDropDown.state_id:
                this.props.cityListAction(
                    this.state.country_id,
                    item["id"],
                    true
                );
                this.setState({state_id: item["id"]});
                break;
            case NameDropDown.city_id:
                this.setState({
                  city_id: item["id"],
                  query: item["name"]
                });
                this.props.franchiseListAction(item["id"])

        }
    };

    onCompleteSelect = (geometry: any) => {
        this.listGeometry = geometry;
    };

    createFranchise = () => {
        let geometry = this.listGeometry;
        const {name, city_id} = this.state;
        if (
            !city_id ||
            !name
        ) {
            toast.error("Please fill field");
            return;
        }
        if (geometry.length <= 0) {
            toast.error("Please select paths on map");
            return;
        }

        const creatFranchise = async (name, geometry, city_id) => {
            await this.props.addFranchiseAction({
                name,
                geometry: geometry[0],
                city: city_id
            });
        }
        creatFranchise(name, geometry, city_id).then(() => {
            // window.location.href = '/admin/franchise/list'
        })
    };

    updateFranchise = () =>{
        let geometry = this.listGeometry;
        const {name, city_id} = this.state;
        if (
            !city_id ||
            !name
        ) {
            toast.error("Please fill field");
            return;
        }
        if (geometry.length <= 0) {
            toast.error("Please select paths on map");
            return;
        }


        const updateFranchise = async (name, geometry, city_id) => {
          await this.props.editFranchiseAction(this.props.current.id,{
            name,
            geometry: geometry[0],
            city: city_id
          });
        }
        updateFranchise(name, geometry, city_id).then(() => {
          document.location.reload()
        })
    }

    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: { name, value }
        } = evt;
        this.setState({
            ...this.state,
            [name]: value
        });
    };
    render() {
        const {
            isLoadingGeoCountry,
            isLoadingGeoCity,
            isLoadingGeoState,
            cities,
            countries,
            states,
            users,
            isLoadingFranchise,
            franchise,
            current
        } = this.props;


        const {name, query, city_id, country_id, state_id} = this.state;

        // const franchiseToEdit = franchise && franchise.length > 0 && franchise.find(i => i.id == franchiseId);

        return (
            <CardContainer title={"Franchise"} className="w-100 h-100">
                <>
                    <div className="row drop-down-row">
                        <Select
                            className={"col-md-4 col-sm-12  mt-2"}
                            name="country_id"
                            getOptionLabel={opt => opt.iso}
                            getOptionValue={opt => opt.id}
                            options={countries}
                            isLoading={isLoadingGeoCountry}
                            placeholder="Country"
                            menuPosition={"fixed"}
                            onChange={this.dropDownItem}
                            menuShouldBlockScroll
                            value={country_id && countries.filter(i => i.id == country_id)}
                            // style={colourStyles}
                        />

                        <Select
                            className={"col-md-4 col-sm-12 mt-2"}
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt.id}
                            options={states}
                            name={"state_id"}
                            isLoading={isLoadingGeoState}
                            placeholder="State"
                            menuPosition={"fixed"}
                            onChange={this.dropDownItem}
                            menuShouldBlockScroll
                            value={state_id && states.filter(i => i.id == state_id)}
                        />

                        <Select
                            className={"col-md-4 col-sm-12 mt-2"}
                            getOptionLabel={opt => opt.name}
                            getOptionValue={opt => opt.id}
                            options={cities}
                            menuPosition={"fixed"}
                            name={"city_id"}
                            isLoading={isLoadingGeoCity}
                            placeholder="City"
                            onChange={this.dropDownItem}
                            menuShouldBlockScroll
                            value={city_id && cities.filter(i => i.id == city_id)}
                        />
                    </div>
                        {this.fromRoute === TypeRoute.fromList 
                            ? 
                            <TableFranchise 
                                users={franchise}
                                query={query}
                                deleteFranchiseAction={this.props.deleteFranchiseAction}
                                isLoading={isLoadingFranchise}/>
                            : 
                            <FormFranchise 
                                onChangeTextInput={this.onChangeTextInput}
                                createFranchise={this.createFranchise}
                                updateFranchise={this.updateFranchise}
                                isLoadingFranchise={isLoadingFranchise}
                                query={query}
                                name={name}
                                users={users}
                                isEdit={this.fromRoute === TypeRoute.fromEdit}
                                franchiseToEdit={current}
                                franchiseGeometries={franchise && franchise.length > 0 && franchise.map(item => item.geometry)}
                                dropDownItem={this.dropDownItem}
                                onCompleteSelect={this.onCompleteSelect}/>
                        }

                </>
            </CardContainer>
        );
    }
}

export default Franchise;

// const colourStyles = {
//   loadingIndicator: styles => ({
//     ...styles,
//     backgroundColor: 'red'
//   })

// };
