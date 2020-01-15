import React from "react"
import styled from 'styled-components'
import Button from '../atoms/button'
import Input from '../atoms/input'
import Label from '../atoms/label'
import Hr from '../atoms/hr'
import H1 from '../atoms/h1'
import Checkbox from '../atoms/checkbox'
import FormContainer from '../atoms/formContainer'
import InputMask from 'react-input-mask'
import FormField from '../molecules/formField'
import FormDropdown from '../molecules/formDropdown'
import FormFieldTextArea from '../molecules/formFieldTextArea'
import TicketPreview from '../molecules/ticketPreview'
import Dropzone from '../molecules/dropzone'
import FormHeader from '../molecules/formHeader'
import ProgressBar from '../molecules/progressBar'
import FormErrors from '../atoms/formErrors'
import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faPrint, faSave, faClone, faExclamationTriangle, faFile, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactToPrint from "react-to-print"
import {GetProductLinesAndWorkAreas, GetFailuresAndParts, SearchTicket, SubmitNPRForm, UploadFile, RemoveFile, DownloadDocument, GetAttachments} from "../../services/npr"
import { getUser, RoleCheck } from "../../services/auth"
import Breadcrumb from "../molecules/breadcrumb"
import SearchBox from '../molecules/searchBox'
import {saveAs} from 'file-saver'
import Alert from '../molecules/alert'
import {Roles, AlertTypes} from '../../data/enums'
import {GetDateWithTime} from '../../data/dateHelper'
import { toast } from "react-toastify"

/* eslint-disable */

const StyledContainer = styled.div`
  margin-bottom: 20px;
  padding: 0;
`
const FilesContainer = styled.div`
    max-width: 740px;
    padding: 0;
    padding-top: 0;
    margin: 0;
    color: #707070;
`
const StyledLabel = styled(Label)`
    float: left;
    font-size: 13px;
    @media screen and (max-width: 993px) {
        float: left;
    } 
`
const LogLabel = styled(Label)`
    float:right;
    font-size: 13px;
`

const MainHeader =styled(Label)`
    font-size: 16px;
    color: #254F9E;
`

export default class NPRForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productLineId: 0, instumentSN: '', partNumber: '', partSN: '', quantityRejected: 1,
            totalTimeDown: "HH:MM", issue: '', solution: '', selectedSubAssPart: '', selectedProductLine: '', 
            selectedFailureType: '', selectedWorkArea: '', subAssSerialNum: '', workAreaID: 0,
            subAssPartID: 0, failureTypeID: 0, ticketCreatedBy: '', ticketCreatedOn: '',
            dispCreatedBy: '', dispCreatedOn: '', submittedBy: getUser().name,
            formValid: true,
            formErrors: { productLine: '', subAssParts:'', failureTypes: '', workAreas:'', quantityRejected: '' },
            hasSubmitted: false,
            searchError: false,
            searchFound: false,
            disableSubmitButton: false,
            pageErrors: [],
            productOptions: [],
            selectedProductOption: 0,
            subAssemblyParts: [],
            failureTypes: [],
            workAreas: [],
            downTimeMask: '',
            ticketSearchTerm: '',
            searchErrors: '',
            nprLogNumber: "-1",
            issueLength: 0,
            solutionLength: 0,
            uploadFiles: [],
            uploading: false,
            uploadProgress: {},
            successfulUpload: false,
            disposition: {},
            dispositionId: -1,
            selectedScrapCode: '',
            selectedDispType: '',
            scrapCodeId: 0,
            scrapCodes: [],
            explanation: '',
            nonConformity: '',
            useAsIs: false,
            rework: false,
            returnToVendor: false,
            scrap: false,
            showScrap: false,
            showAlert: false,
            alertMessage: '',
            alertType: '',
            alertYesFunction: '',
            readOnlyAccess: false,
            duplicating: false         
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this); 
        this.handleProgress = this.handleProgress.bind(this);
        this.scrollRef = React.createRef();
    }

    componentDidMount(){
          GetProductLinesAndWorkAreas()
          .then(data => {
                if(data.Products && data.ScrapCodes && data.WorkAreas){
                    this.setState(
                        {
                            productOptions: data.Products.map(product => ({
                                value: product.ProductLineID, 
                                key:product.ProductLineID, 
                                label:product.ProductLineDescription
                        })),
                            workAreas: data.WorkAreas.map(area => ({
                                value: area.WorkAreaID,
                                key: area.WorkAreaID,
                                label:area.WorkAreaDescription
                        })),
                            scrapCodes: data.ScrapCodes.map(scrapCode => ({
                                value: scrapCode.ScrapCodeId,
                                key: scrapCode.ScrapCodeId,
                                label: scrapCode.ScrapCodeDescription
                        })),
                            readOnlyAccess: (RoleCheck(Roles.readOnly) || RoleCheck(Roles.qualityEngineer)) && !RoleCheck(Roles.admin) ? true : false
                        }
                    );
                }
          });
    }

    validateForm() {
        let hasErrors = false;
        this.setState({formErrors: { productLine: '', subAssParts:'', failureTypes: '', workAreas:'', quantityRejected: '' }});
        let tempFormErrors = this.state.formErrors;
        if(this.state.productLineId == 0){            
            tempFormErrors.productLine = "A Product Line is required.";            
            hasErrors = true;
        }
        else{
            tempFormErrors.productLine = '';
        }
        if(this.state.failureTypeID == 0){
            tempFormErrors.failureTypes = "A Failure Mode is required.";
            hasErrors = true;
        }
        else{
            tempFormErrors.failureTypes = '';
        }
        if(this.state.workAreaID == 0){
            tempFormErrors.workAreas = "A Work Area is required.";
            hasErrors = true;
        }
        else{
            tempFormErrors.workAreas = '';
        }
        if(this.state.quantityRejected == 0){
            tempFormErrors.quantityRejected = "Quantity Rejected has to be greater than 0.";
            hasErrors = true;
        }
        else{
            tempFormErrors.quantityRejected = '';
        }
        this.setState({ formErrors: tempFormErrors});
        if(hasErrors){
            this.setState({
                showAlert: true, 
                alertMessage:'Form error(s) found, please fix the highlighted error(s) before submitting again.',
                alertType: AlertTypes.error
            })
            return false;
        }
        else{
            return true;
        }
        
    }
    // Toggle 
    toggleIsChecked = (e) => {
        this.setState({[e.target.name]: e.target.checked});
    }

    closeAlert = () => {
        this.setState({showAlert: false, alertMessage: '', alertType: ''});
    }

    handleAlertButton = (result) => {
        this.setState({alertResponse: result});
    }

    handleSubmit(event) {
        event.preventDefault();
        var formState = this.validateForm();
        if(formState){
            this.submitTicket(event);
        }    
    }

    handleProductChange = event => { 
        if(!this.state.readOnlyAccess){
            let prodValue = event.target.value;    
            this.setState({subAssPartID: 0, failureTypeID: 0})   
            GetFailuresAndParts({ProductLineID: prodValue})
            .then(data => {
                let subAssemblyOptions = data.SubParts.map(part => ({value: part.PartID, key:part.PartID, label:part.PartNumber + " - " + part.PartDescription}));
                let failureTypesOptions = data.Failures.map(failure => ({value: failure.FailureID, key:failure.FailureID, label:failure.FailureDescription})); 
                this.setState({selectedProductOption: prodValue, 
                    productLineId: prodValue,
                    selectedProductLine:this.state.productOptions[prodValue - 1].label, 
                    subAssemblyParts:subAssemblyOptions, 
                    failureTypes: failureTypesOptions,
                    selectedFailureType: '',
                    selectedSubAssPart: ''
                }); 
            });
        }
    }

    handleWorkAreaChange = event => {
        if(!this.state.readOnlyAccess){
            let workAreaValue = event.target.value;
            this.setState({
                selectedWorkArea: this.state.workAreas.filter(area => area.value == workAreaValue)[0].label,
                workAreaID: workAreaValue
            });
        }
    }

    handleSubAssemblyPartChange = event => {
        if(!this.state.readOnlyAccess){            
            let subAssValue = event.target.value;
            this.setState({
                selectedSubAssPart: this.state.subAssemblyParts.filter(part => part.value == subAssValue)[0].label,
                subAssPartID: subAssValue
            });
        }
    }

    handleFailureTypeChange =event => {
        if(!this.state.readOnlyAccess){
            let failType = event.target.value;
            this.setState({
                selectedFailureType: this.state.failureTypes.filter(failure => failure.value == failType)[0].label,
                failureTypeID: failType
            });
        }
    }

    ticketSearch = event => {
        this.setState({formErrors: { productLine: '', subAssParts:'', failureTypes: '', workAreas:'', quantityRejected: '', submitSuccess: false }});
        SearchTicket({searchTerm: this.state.ticketSearchTerm})
        .then(res => {
            if(res.resCode == 1){
                this.setState({
                    productLineId: res.data.ProductLineID,
                    selectedProductLine: this.state.productOptions[res.data.ProductLineID - 1].label,
                    instumentSN: res.data.InstrumentSerialNumber,
                    issue: res.data.Issue,
                    nprLogNumber: res.data.NPRID,
                    partNumber: res.data.PartNumber,
                    partSN: res.data.PartSerialNumber,
                    quantityRejected: res.data.QuantityRejected,
                    solution: res.data.Solution,
                    subAssSerialNum: res.data.SubAssemblySerialNumber,
                    totalTimeDown: res.data.TotalTimeDown,
                    workAreaID: res.data.WorkAreaID,
                    selectedWorkArea: this.state.workAreas.filter(area => area.value == res.data.WorkAreaID)[0].label,
                    subAssPartID: res.data.SubAssemblyPartID,
                    failureTypeID: res.data.FailureID,
                    uploadFiles: res.data.NPRAttachments,
                    submittedBy: res.data.Submitter,
                    ticketCreatedBy: res.data.CreatedBy,
                    ticketCreatedOn: res.data.CreatedOn,
                    selectedScrapCode: '',
                    selectedDispType: res.data.Disposition ? res.data.Disposition.DispositionType : '',
                    scrapCodeId: res.data.Disposition ? res.data.Disposition.ScrapCodeId : 0,
                    explanation: res.data.Disposition ? res.data.Disposition.Explanation : '',
                    nonConformity: res.data.Disposition ? res.data.Disposition.NonConformity : '',
                    useAsIs: res.data.Disposition && (res.data.Disposition.DispositionType === "Use As Is") ? true : false,
                    rework: res.data.Disposition && (res.data.Disposition.DispositionType === "Rework") ? true : false,
                    returnToVendor: res.data.Disposition && (res.data.Disposition.DispositionType === "Return to Vendor") ? true : false,
                    scrap: res.data.Disposition && (res.data.Disposition.DispositionType === "Scrap") ? true : false,
                    showScrap: res.data.Disposition && (res.data.Disposition.DispositionType === "Scrap") ? true : false,
                    dispositionId: res.data.Disposition ? res.data.EngineeringDispositionID : 0,
                    readOnlyAccess: (res.data.CreatedBy == getUser().id && !res.data.Disposition) || RoleCheck(Roles.mechanicalEngineer) || RoleCheck(Roles.admin) ? false : true
                });    
                GetFailuresAndParts({ProductLineID: res.data.ProductLineID})
                .then(data => {
                    let subAssemblyOptions = data.SubParts.map(part => ({value: part.PartID, key:part.PartID, label:part.PartNumber + " - " + part.PartDescription}));
                    let failureTypesOptions = data.Failures.map(failure => ({value: failure.FailureID, key:failure.FailureID, label:failure.FailureDescription}));
                    this.setState({
                        subAssemblyParts: subAssemblyOptions,
                        failureTypes: failureTypesOptions,
                        selectedFailureType: failureTypesOptions.filter(failure => failure.value == res.data.FailureID)[0].label,
                        selectedSubAssPart: res.data.SubAssemblyPartID ? subAssemblyOptions.filter(part => part.value == res.data.SubAssemblyPartID)[0].label : '',
                        searchFound: true,
                        searchError: false
                    })
                })
                .catch(err => {
                    this.setState({searchError: true, searchFound: false});
                });
            }
            else{
                this.setState({searchError: true, searchFound: false});
            }
        })
        .catch(err => {
            this.setState({searchError: true, searchFound: false});
        });
    }

    handleSearchChange = event => {
        let term = event.target.value;
        this.setState({ticketSearchTerm: term, searchFound: false, searchError: false});
    }

    createNew = (event) => {        
        if(typeof window !== 'undefined') {
            window.scrollTo(0, this.scrollRef.current.offsetTop);
        }
        this.setState({
            productLineId: 0, instumentSN: '', partNumber: '', partSN: '', quantityRejected: 1,
            totalTimeDown: "", issue: '', solution: '', selectedSubAssPart: '', selectedProductLine: '', 
            selectedFailureType: '', selectedWorkArea: '', subAssSerialNum: '', workAreaID: 0,
            subAssPartID: 0, failureTypeID: 0, ticketCreatedBy: '', ticketCreatedOn: '',
            dispCreatedBy: '', dispCreatedOn: '', submittedBy: getUser().name,
            formValid: true,
            formErrors: { productLine: '', subAssParts:'', failureTypes: '', workAreas:'', quantityRejected: '' },
            hasSubmitted: false,
            searchError: false,
            searchFound: false,
            disableSubmitButton: false,
            pageErrors: [],
            selectedProductOption: 0,
            subAssemblyParts: [],
            failureTypes: [],
            ticketSearchTerm: '',
            searchErrors: '',
            nprLogNumber: "-1",
            issueLength: 0,
            solutionLength: 0,
            uploadFiles: [],
            uploading: false,
            uploadProgress: {},
            successfulUpload: false,
            disposition: {},
            dispositionId: -1,
            selectedScrapCode: '',
            selectedDispType: '',
            scrapCodeId: 0,
            explanation: '',
            nonConformity: '',
            useAsIs: false,
            rework: false,
            returnToVendor: false,
            scrap: false,
            showScrap: false,
            showAlert: false,
            alertMessage: '',
            alertType: '',
            alertYesFunction: '',
            duplicating: false,
            readOnlyAccess: false,
            ticketCreatedBy: ''
        });    
    }

    duplicate = event => {
        if(!this.state.readOnlyAccess){
            this.setState({
                showAlert: true, 
                alertMessage:'Are you sure you want to duplicate this ticket? You will lose any unsaved changes.', 
                alertType: AlertTypes.confirm, 
                alertYesFunction: this.submitTicket,
                submitSuccess: false,
                uploadFiles: [],
                duplicating: true
            });
        }
    }

    submitTicket = data => {        
        if(!this.state.readOnlyAccess){
            this.setState({showAlert: false});
            let nprFormObject = {
                NPRID: this.state.nprLogNumber != 0 && !this.state.duplicating ? this.state.nprLogNumber : 0,
                ProductLineID: this.state.productLineId ,
                InstrumentSerialNumber: this.state.instumentSN ,
                SubAssemblyPartID: this.state.subAssPartID ,
                PartNumber: this.state.partNumber ,
                PartSerialNumber: this.state.partSN ,
                FailureID: this.state.failureTypeID ,
                QuantityRejected: this.state.quantityRejected ,
                TotalTimeDown: this.state.totalTimeDown ,
                Issue: this.state.issue ,
                Solution: this.state.solution ,
                EngineeringDispositionID: this.state.dispositionId ,
                CreatedBy: this.state.ticketCreatedBy ? this.state.ticketCreatedBy : getUser().id ,
                UpdatedBy: getUser().id,
                CreatedOn: this.state.ticketCreatedOn ? this.state.ticketCreatedOn : GetDateWithTime() ,
                UpdatedOn: GetDateWithTime() ,
                SubAssemblySerialNumber: this.state.subAssSerialNum ,
                WorkAreaID: this.state.workAreaID,
                Disposition: {
                    Explanation: this.state.explanation,
                    NonConformity: this.state.nonConformity,
                    ScrapCodeID: this.state.showScrap ? this.state.scrapCodeId : null,
                    DispositionType: this.state.selectedDispType,
                    CreatedBy: this.state.dispCreatedBy ? this.state.dispCreatedBy : getUser().id ,
                    UpdatedBy: getUser().id,
                    CreatedOn: this.state.dispCreatedOn ? this.state.dispCreatedOn : GetDateWithTime() ,
                    UpdatedOn: GetDateWithTime()
                }
            };
            SubmitNPRForm({formData: nprFormObject})
            .then(res => {
                this.setState({nprLogNumber: res.data.FormId, dispositionId: res.data.DispId, duplicating: false, ticketCreatedOn: res.data.CreatedDate});
                if(typeof window !== 'undefined') {
                    window.scrollTo(0, this.scrollRef.current.offsetTop);
                }
                toast.success("Success! Ticket has been saved. Edit details below."); 
                          
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    replaceBadInputs(val){
        val = val.replace(/[^\dh:]/, "");
        val = val.replace(/^[^0-2]/, "");
        val = val.replace(/^([2-9])[4-9]/, "$1");
        val = val.replace(/^\d[:h]/, "");
        val = val.replace(/^([01][0-9])[^:h]/, "$1");
        val = val.replace(/^(2[0-3])[^:h]/, "$1");
        val = val.replace(/^(\d{2}[:h])[^0-5]/, "$1");
        val = val.replace(/^(\d{2}h)./, "$1");
        val = val.replace(/^(\d{2}:[0-5])[^0-9]/, "$1");
        val = val.replace(/^(\d{2}:\d[0-9])./, "$1");
        return val;
    }

    maskFunction = (event) => {
        let eventKey = event.keyCode || event.charCode;
        let maskTarget = event.target;
        let currValue = event.target.value;
        var lastLength;
        if(currValue.length === 3){
            if(eventKey === 8){
                maskTarget.value = currValue.substring(0,2);
            }
        }
        else if(currValue.length === 2){
            maskTarget.value = currValue + ":";
        }
        else{
            do {
                // Loop over the input to apply rules repeately to pasted inputs
                lastLength = currValue.length;
                currValue = this.replaceBadInputs(currValue);
            } while(currValue.length > 0 && lastLength !== currValue.length);
            maskTarget.value = currValue;
        }   
        this.setState({totalTimeDown: maskTarget.value});      
    }

    removeSearchNotification = (event) => {
        this.setState({searchFound:false, searchError: false})
    }    

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if(document.activeElement.name == "ticketSearchBox"){
                this.ticketSearch();
            }
        }
    }

    handleUserInput = (event) => {
        if(!this.state.readOnlyAccess){
            const name = event.target.name;
            const value = event.target.value;
            this.setState({ [name]: value }); 
        }       
    }    

    onFilesAdded = (files) => {
        if(!this.state.readOnlyAccess){
            this.setState(prevState => ({
                uploadFiles: prevState.uploadFiles.concat(files)
            }), () => {
                this.uploadFiles();
            }); 
        }     
    }

    uploadFiles = async () => {
        this.setState({uploadProgress: {}, uploading: true});
        const promises = [];
        this.state.uploadFiles.forEach(file => {
            if((file.size/1024/1024) <= 5){
                promises.push(UploadFile({file: file, handleProgress: this.handleProgress, ticketID: this.state.nprLogNumber, userId: getUser().id}));
            }    
            else{
                if(typeof window !== 'undefined') {
                    window.scrollTo(0, this.scrollRef.current.offsetTop);
                }
                toast.error("The file " + file.name + " is too large. The max file size is 5MB.");
            }                 
        });
        try
        {
            await Promise.all(promises);
            this.setState({successfulUpload: true, uploading: false});
            if(this.state.nprLogNumber != '-1'){
                GetAttachments({nprID: this.state.nprLogNumber})
                .then(res => {
                    this.setState({uploadFiles:res.data});
                })
                .catch(err => {
                    console.log(err);
                });
            }            
        }
        catch(e){
            console.log(e);
            this.setState({successfulUpload: true, uploading: false});
        }
    }    

    removeFile = (event) => {
        if(!this.state.readOnlyAccess){
            let fileIndex = event.currentTarget.id;
            let fileId = this.state.uploadFiles[fileIndex].AttachmentID;
            let newUploadFileList = this.state.uploadFiles;
            RemoveFile({fileId:fileId})
            .then(res => {
                newUploadFileList.splice(fileIndex, 1);
                this.setState({uploadFileList: newUploadFileList});
            })
            .catch(err => {
                console.log(err);
            });  
        }
    }

    renderProgress = (file) => {
        const uploadProgress = this.state.uploadProgress[file.name];
        if(this.state.uploading || this.state.successfulUpload){
            return (
                <div>
                    <ProgressBar name={file.name + "PBar"} style={{float:"right"}} barColor="#33AA11" progress={uploadProgress ? uploadProgress.percentage : 0}></ProgressBar>
                </div>
            )
        }
    }

    handleProgress = (event, file) => {
        const copy = { ...this.state.uploadProgress};
        copy[file.name] = {
            state:"pending",
            percentage: (event.loaded / event.total) * 100
        };
        this.setState({uploadProgress: copy});
    }

    handleScrapChange = (event) => {
        if(!this.state.readOnlyAccess){
            let scrap = event.target.value;
            this.setState({
                selectedScrapCode: this.state.scrapCodes.filter(scrapCode => scrapCode.value == scrap)[0].label,
                scrapCodeId: scrap
            });
        }
    }

    handleDispTypeChange = (event) => {
        if(!this.state.readOnlyAccess){
            let dispType = event.target.title;
            if(dispType == "Use As Is"){
                this.setState({
                    useAsIs: true,
                    rework: false,
                    returnToVendor: false,
                    scrap: false,
                    selectedDispType: dispType,
                    showScrap: false
                });
            }
            else if(dispType == "Rework"){
                this.setState({
                    useAsIs: false,
                    rework: true,
                    returnToVendor: false,
                    scrap: false,
                    selectedDispType: dispType,
                    showScrap: false
                });
            }
            else if(dispType == "Return to Vendor"){
                this.setState({
                    useAsIs: false,
                    rework: false,
                    returnToVendor: true,
                    scrap: false,
                    selectedDispType: dispType,
                    showScrap: false
                });
            }
            else{
                this.setState({
                    useAsIs: false,
                    rework: false,
                    returnToVendor: false,
                    scrap: true,
                    selectedDispType: dispType,
                    showScrap: true
                });
            }
        }
    }

    downloadFile = file => {
        if(file.FileName){
            DownloadDocument({fileId: file.AttachmentID})
            .then(res => {
                let doc = new Blob([res.data], {type: file.FileType});
                saveAs(doc, file.FileName);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        return (
            <>
            {this.state.showAlert && 
                <Alert closeAlert={this.closeAlert} message={this.state.alertMessage} yesFunction={this.state.alertYesFunction} alertType={this.state.alertType}></Alert>
            }
            <div ref={this.scrollRef}></div>
            <Row>
                <Col>                    
                    <Breadcrumb half={true} links={[{text: "NPR Rejection", href: "/npr/npr-ticket"}]}></Breadcrumb>
                </Col>
                <Col>
                    <SearchBox searchFunction={this.ticketSearch} placeholder="Enter Ticket Number" name="ticketSearchBox" searchFound={this.state.searchFound}
                        searchTerm={this.state.ticketSearchTerm} onChange={this.handleSearchChange} searchError={this.state.searchError} 
                        onBlur={this.removeSearchNotification} onKeyPress={this.handleKeyPress}>
                    </SearchBox>     
                </Col>
            </Row>
            <Hr style={{marginTop: "5px", marginBottom:"35px"}}/>
            <Row>
                <Col>
                    <H1><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>&nbsp;NPR Rejection</H1>
                </Col>
                <Col xs="12" sm="12" md="12" lg="7">
                    <H1>Rejection Ticket Preview</H1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormContainer>
                    <form id="form" onSubmit={this.handleSubmit}>
                        <StyledContainer>
                            <Row>
                                <Col xs="12" sm="12" md="12" lg="5">
                                    <StyledLabel>{new Date(Date.now()).toLocaleString([], {month:'numeric', day:"numeric", year:"numeric", hour: '2-digit', minute:'2-digit'})}</StyledLabel>
                                </Col>
                                <Col xs="12" sm="12" md="12" lg="7">
                                    <LogLabel style={{textAlign: "right"}}>NPR Log Number: {this.state.nprLogNumber !== '-1' ? this.state.nprLogNumber : ''}</LogLabel>
                                </Col>
                            </Row>
                            <FormDropdown title="Product Line" 
                            invalid={this.state.formErrors.productLine.length > 0} 
                            value={this.state.productLineId} 
                            onChange={this.handleProductChange} 
                            name="productLine" 
                            options={this.state.productOptions}
                            dropdownContentType="product line"
                            required={true}>                            
                            </FormDropdown>
                            <FormDropdown title="Failure Mode" 
                            invalid={this.state.formErrors.failureTypes.length > 0} 
                            value={this.state.failureTypeID}
                            name="failureMode" 
                            options={this.state.failureTypes}
                            dropdownContentType="failure mode"
                            onChange={this.handleFailureTypeChange}
                            required={true}>                            
                            </FormDropdown>
                            <FormField title="Instrument Serial&nbsp;#" value={this.state.instumentSN} onChange={this.handleUserInput} name="instumentSN" maxLength="13"></FormField>
                            <FormDropdown title="Work Area" 
                            invalid={this.state.formErrors.workAreas.length > 0} 
                            value={this.state.workAreaID}
                            name="workArea" 
                            options={this.state.workAreas}
                            dropdownContentType="work area"
                            onChange={this.handleWorkAreaChange}
                            required={true}>                            
                            </FormDropdown>
                            <FormDropdown title="Sub-Assembly Part&nbsp;#" 
                            value={this.state.subAssPartID}
                            name="subAssPartNum" 
                            options={this.state.subAssemblyParts}
                            dropdownContentType="sub-assembly part"
                            onChange={this.handleSubAssemblyPartChange}>                            
                            </FormDropdown>
                            <FormField title="Sub-Assembly Serial&nbsp;#" value={this.state.subAssSerialNum} onChange={this.handleUserInput} name="subAssSerialNum" maxLength="25"></FormField>
                            <FormField title="Part Number" value={this.state.partNumber} onChange={this.handleUserInput} name="partNumber" maxLength="15"></FormField>
                            <FormField title="Part Serial #" value={this.state.partSN} onChange={this.handleUserInput} name="partSN" maxLength="25"></FormField>
                            <Row>
                                <Col xs="12" sm="12" md="3" lg="4" >
                                    <StyledLabel>Quantity Rejected</StyledLabel>
                                </Col>
                                <Col xs="12" sm="12" md="8" lg="2" >
                                    <Input type="number" value={this.state.quantityRejected} onChange={this.handleUserInput} name="quantityRejected" required={true} invalid={this.state.quantityRejected < 1} ></Input>
                                </Col>
                                <Col xs="12" sm="12" md="3" lg="3">
                                    <StyledLabel>Time&nbsp;Down<span style={{ fontSize: "10px" }}>(HH:MM)</span></StyledLabel>
                                </Col>
                                <Col xs="12" sm="12" md="8" lg="3" >
                                    <InputMask mask="HH:Mm" value={this.state.totalTimeDown} onChange={this.handleUserInput} name="totalTimeDown" required={true}
                                    style={{display:"block", width:"100%", margin:"0", height:"40px", 
                                    boxSizing:"border-box", fontSize:"14px", color:"#9e9e9e", 
                                    border:"1px solid #bdbdbd", borderRadius:"2px",
                                    marginBottom:"5px", padding:"0 .70em"}} formatChars={{'H':'[0-9]', 'M':'[0-5]', 'm':'[0-9]'}}>
                                    </InputMask>
                                </Col>
                            </Row>
                            <FormFieldTextArea  title="Issue" value={this.state.issue} onChange={this.handleUserInput} name="issue" maxLength="350" required={true}></FormFieldTextArea>
                            <FormFieldTextArea  title="Solution" value={this.state.solution} onChange={this.handleUserInput} name="solution" maxLength="350" required={true}></FormFieldTextArea>  
                            <Row>
                                <Col xs="12" sm="12" md="8" lg="4">
                                    <StyledLabel>Upload Documents</StyledLabel>
                                </Col>
                                <Col xs="12" sm="12" md="8" lg="8">
                                    <Dropzone onFilesAdded ={this.onFilesAdded} disabled={this.state.nprLogNumber === '-1' || this.state.readOnlyAccess} backColor='#254F9E' helperText={this.state.nprLogNumber === '-1' ? 'An NPR Log number is required for file uploads.' : '5MB filesize max'}></Dropzone>
                                </Col>
                            </Row>
                            <Hr style={{marginTop: "15px"}}/>
                            {(RoleCheck(Roles.mechanicalEngineer) || RoleCheck(Roles.admin)) && (<>
                                <Row>
                                    <FormHeader>Disposition</FormHeader>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="12" md="8" lg="4">
                                        <Checkbox title="Use As Is" checked={this.state.useAsIs} onChange={this.handleDispTypeChange}></Checkbox>
                                    </Col>
                                    <Col xs="12" sm="12" md="8" lg="3">
                                        <Checkbox title="Rework" checked={this.state.rework} onChange={this.handleDispTypeChange}></Checkbox>
                                    </Col>
                                    <Col xs="12" sm="12" md="8" lg="5">
                                        <Checkbox title="Return to Vendor" checked={this.state.returnToVendor} onChange={this.handleDispTypeChange}></Checkbox>
                                    </Col>                                                    
                                </Row>
                                <Row>
                                    <Col xs="12" sm="12" md="8" lg="4">
                                        <Checkbox title="Scrap" checked={this.state.scrap} onChange={this.handleDispTypeChange}></Checkbox>
                                    </Col>     
                                    {this.state.showScrap && <Col xs="12" sm="12" md="8" lg="8">
                                            <FormDropdown title="Scrap Code" 
                                                value={this.state.scrapCodeId}
                                                name="scrapCode" 
                                                options={this.state.scrapCodes}
                                                dropdownContentType="scrap code"
                                                onChange={this.handleScrapChange}>                            
                                            </FormDropdown>                                    
                                    </Col>}                                
                                </Row>   
                                <Row>
                                    <Col>
                                        <FormFieldTextArea  title="Non-Conformity" value={this.state.nonConformity} onChange={this.handleUserInput} name="nonConformity" maxLength="350" ></FormFieldTextArea>
                                        <FormFieldTextArea  title="Explanation" value={this.state.explanation} onChange={this.handleUserInput} name="explanation" maxLength="350" ></FormFieldTextArea>
                                    </Col>
                                </Row> 
                            </>)}   
                            <Row>
                                <Col xs="4" sm="4" md="6" >
                                    <br />
                                    {this.state.disableSubmitButton &&
                                        <Button disabled={true} style={{ width: "100%" }} alt="true"><FontAwesomeIcon className="fa-spin fa-pulse fa-2x" icon={faSpinner}></FontAwesomeIcon></Button>
                                    }
                                    {!this.state.disableSubmitButton &&
                                        <Button type="submit" style={{ width: "100%" }} disabled={!this.state.formValid || this.state.readOnlyAccess} alt="true"><FontAwesomeIcon icon={faSave}></FontAwesomeIcon>&nbsp;Save</Button>
                                    }
                                </Col>
                                <Col xs="4" sm="4" md="6" >
                                    <br />
                                    <ReactToPrint trigger={() =>  <Button style={{ width: "100%" }} alt="true" disabled={this.state.nprLogNumber === '-1' || this.state.readOnlyAccess}><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>&nbsp;Print</Button>}
                                        content={() => this.componentRef}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4" sm="4" md="6" >
                                    <br />
                                    <Button target="_blank" state={this.state} onClick={this.duplicate} style={{ width: "100%" }} alt="true" disabled={this.state.nprLogNumber === '-1' || this.state.readOnlyAccess}>
                                        <FontAwesomeIcon icon={faClone}></FontAwesomeIcon>&nbsp;Duplicate
                                    </Button>
                                </Col>
                                <Col xs="4" sm="4" md="6" >
                                    <br />
                                    <Button target="_blank" state={this.state} onClick={this.createNew} style={{ width: "100%" }} disabled={(RoleCheck(Roles.readOnly) || RoleCheck(Roles.qualityEngineer)) && !RoleCheck(Roles.admin)} alt="true">
                                        <FontAwesomeIcon icon={faClone}></FontAwesomeIcon>&nbsp;Create New
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="12" md="12" >
                                    <FormErrors formErrors={this.state.formErrors} />
                                    <FormErrors formErrors={this.state.pageErrors} />
                                </Col>
                            </Row>                            
                        </StyledContainer>
                    </form>
                </FormContainer>
                </Col>
                <Col lg="7" >
                    <div id='printarea' style={{marginBottom:"30px"}}>
                        <TicketPreview  ref={el => (this.componentRef = el)} state={this.state}></TicketPreview>
                    </div>
                    <H1>Document Uploads</H1>
                    <FilesContainer>
                        {this.state.uploadFiles.length === 0 && <span>No documents have been uploaded.</span>}
                        {this.state.uploadFiles.map((file, index) => {
                            return (
                                <div key={file.AttachmentID ? file.AttachmentID : file.name} style={{border:"1px solid #707070", padding:"10px 20px 10px 15px", height: "42px", fontSize: "12px"}}>
                                    <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>&nbsp;&nbsp;
                                    <span onClick={() => this.downloadFile(file)} id={index} value={file.Data ? file.Data : ''} style={{cursor:"pointer", color:"blue"}}>{file.FileName ? file.FileName : file.name}</span>
                                    {(file.FileName && !this.state.readOnlyAccess) && <div id={index} onClick={this.removeFile} style={{float:"right", cursor:"pointer"}}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></div>}
                                    <div style={{float:"right"}}>
                                        {file.FileName ? '' : this.renderProgress(file)}
                                    </div>
                                </div>
                            )
                        })}
                    </FilesContainer>                     
                </Col>
            </Row>
            </>
        );
    }    
}

