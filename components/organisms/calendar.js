import React, {Fragment} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {GetCalendarData} from '../../services/data'
import Alert from '../molecules/alert'
import {AlertTypes} from '../../data/enums'
import {withTheme} from 'styled-components'
import AddEventForm from '../organisms/addEventForm'
import {ParseGoogleDate} from '../../services/data'

import '../themes/calendar.css';

moment.locale('en-US');


/*const myEvents = [
    {
        id: 0,
        title: "Test event",
        allDay: false,
        start: new Date(2019, 5, 11, 9, 0),
        end: new Date(2019, 5, 11, 13, 30),
        desc: "The ultimate test event"
    }
];*/

class Calendar extends React.Component {  
    
    constructor () {
        super();
        this.state = {
            events: [],
            showAlert: false,
            alertMessage: "",
            alertType: "",
            selEventStartDate: "",
            selEventEndDate: ""
        }

    }

    componentDidMount(){
        if(this.props.calendarId){
            var eventData = [];
            GetCalendarData({calendarId:this.props.calendarId})
            .then(res => {
                eventData = res.data.items.map((item) => {
                    return({
                        id: item.id,
                        start: item.start.date ? new Date(item.start.date) : ParseGoogleDate(item.start.dateTime),
                        end: item.end.date ? new Date(item.end.date) : ParseGoogleDate(item.end.dateTime),
                        title: item.summary || "Event",
                        desc: item.description || "",
                        allDay: item.date ? true : false,
                        tooltipAccessor: item.summary
                    });
                    
                });
                this.setState({events: eventData});
            })
            .catch(e => {
                console.log(e);
            })
        }
        else if(this.props.events){
            this.setState({events: this.props.events});
        }
    }

    eventFunc = ({event}) =>{
        return(
            <span >
                <strong>{event.title}: </strong>
                {event.desc}
            </span>
        );
    }

    eventAgendaFunc = ({event}) => {
        return(
            <span>
                <em style={{color:'magenta'}}>{event.title}</em>
            </span>
        )
    }

    closeAlert = () => {
        this.setState({showAlert: false, alertMessage: '', alertType: ''});
    }

    handleAlertButton = (result) => {
        this.setState({alertResponse: result});
    }

    eventDetail = (event) => {
        var startDate = new Date(event.start);
        var endDate = new Date(event.end);
        var messgae = (
            <Fragment>
                <h3>{event.title}</h3>
                <br/>
                <p>{event.desc}</p>
                <br/>
                <span><strong>Start:</strong> {startDate.toLocaleString([], {month:'numeric', day:"numeric", year:"numeric", hour: '2-digit', minute:'2-digit'})}</span>
                <br/>
                <span><strong>End:</strong> {endDate.toLocaleString([], {month:'numeric', day:"numeric", year:"numeric", hour: '2-digit', minute:'2-digit'})}</span>
            </Fragment>
        );
        this.setState({showAlert: true, alertType: AlertTypes.info, alertMessage: messgae});
    }

    formatEvent = () => {
        var style = {
            backgroundColor: this.props.theme.palette["primary"][0],
        };
        return {
            style: style
        };
    }

    handleSelect = (slot) => {
        var start = slot.slots[0];
        var end = slot.slots[slot.slots.length -1];
        this.setState({selEventStartDate: start, selEventEndDate: end,showAddEvent: true});
    }

    closeForm = () =>{
        this.setState({showAddEvent: false});
    }

    submitNewEvent = () => {
        this.setState({showAddEvent: false});
        console.log("I'm here");
    }

    addEvent = (props) => {
        /*AddCalendarEvent({calendarId:this.props.calendarId ,endDate:props.eventEnd, startDate:props.eventStart, description: props.description, title: props.title})
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        });*/
        var eventList = this.state.events;
        eventList.push({
            start: props.eventStart,
            end: props.eventEnd,
            title: props.title,
            desc: props.description,
            tooltipAccessor: props.title
        });
        this.setState({events: eventList, showAddEvent: false});
    }
    

    render() {
        return (
            <div style={{height: "700px"}}>
                {this.state.showAlert && 
                    <Alert closeAlert={this.closeAlert} message={this.state.alertMessage} alertType={this.state.alertType}></Alert>
                }
                {this.state.showAddEvent &&
                    <AddEventForm closeForm={this.closeForm} start={this.state.selEventStartDate} end={this.state.selEventEndDate} submitFunction={this.addEvent}></AddEventForm>
                }
                <BigCalendar
                    onSelectEvent={this.eventDetail}
                    localizer={BigCalendar.momentLocalizer(moment)}
                    events= {this.state.events}
                    eventPropGetter = {this.formatEvent}
                    views={["month","day","agenda"]}   
                    components={{
                        event: this.eventFunc,
                        agenda: {
                            event: this.agendaFunc
                        }
                    }}   
                    selectable={true}
                    onSelectSlot={this.handleSelect}              
                />
            </div>

        )
    }
}

export default withTheme(Calendar);