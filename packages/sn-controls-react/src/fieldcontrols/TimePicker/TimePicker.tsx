/**
 * @module FieldControls
 *
 */ /** */
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import { TimePicker as MUITimePicker } from 'material-ui-pickers'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import React, { Component, Fragment } from 'react'
import { ReactClientFieldSetting, ReactClientFieldSettingProps } from '../ClientFieldSetting'
import { ReactDateTimeFieldSetting } from '../DateTimeFieldSetting'

/**
 * Interface for DatePicker properties
 */
export interface TimePickerProps extends ReactClientFieldSettingProps, ReactClientFieldSetting, ReactDateTimeFieldSetting { }

/**
 * Field control that represents a Date field. Available values will be populated from the FieldSettings.
 */
export class TimePicker extends Component<TimePickerProps, {}> {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props: TimePickerProps) {
        super(props)
    }

    /**
     * convert string to proper date format
     * @param {string} value
     */
    public setValue(value) {
        // TODO: check datetimemode and return a value based on this property
        let date = ''
        if (value) {
            date = value.split('T')[0]
        } else {
            date = new Date().toISOString().split('T')[0]
        }
        return date
    }
    /**
     * handle changes
     * @param {Date} date
     */
    public handleDateChange = (date) => {
        this.setState({ value: date })
        this.props.onChange(this.props.name, date)
    }
    /**
     * render
     * @return {ReactElement} markup
     */
    public render() {
        const { readOnly, required } = this.props
        switch (this.props['data-actionName']) {
            case 'edit':
                return (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Fragment>
                            <MUITimePicker
                                value={this.props.value}
                                onChange={this.handleDateChange}
                                label={this.props['data-labelText']}
                                id={this.props.name}
                                disabled={readOnly}
                                placeholder={this.props['data-placeHolderText']}
                                required={required}
                                fullWidth
                                className={this.props.className}
                            />
                        </Fragment>
                        <FormHelperText>{this.props['data-hintText']}</FormHelperText>
                        <FormHelperText color="error">{this.props['data-errorText']}</FormHelperText>
                    </MuiPickersUtilsProvider>
                )
            case 'new':
                return (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Fragment>
                            <MUITimePicker
                                value={this.props['data-defaultValue']}
                                onChange={this.handleDateChange}
                                label={this.props['data-labelText']}
                                id={this.props.name}
                                disabled={readOnly}
                                placeholder={this.props['data-placeHolderText']}
                                required={required}
                                fullWidth
                                className={this.props.className}
                            />
                        </Fragment>
                        <FormHelperText>{this.props['data-hintText']}</FormHelperText>
                        <FormHelperText color="error">{this.props['data-errorText']}</FormHelperText>
                    </MuiPickersUtilsProvider>
                )
            case 'browse':
                return (
                    this.props.value ? <div className={this.props.className}>
                        <Typography variant="caption" gutterBottom>
                            {this.props['data-labelText']}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.props.value}
                        </Typography>
                    </div> : null
                )
            default:
                return (
                    this.props.value ? <div className={this.props.className}>
                        <Typography variant="caption" gutterBottom>
                            {this.props['data-labelText']}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.props.value}
                        </Typography>
                    </div> : null
                )
        }
    }
}