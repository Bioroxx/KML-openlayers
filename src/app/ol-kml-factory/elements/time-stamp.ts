import {DateTimeType, TimeStampType} from 'kmljs';
import {AbstractTimePrimitiveGroup} from './abstract-time-primitive-group';

export class TimeStamp extends AbstractTimePrimitiveGroup implements TimeStampType {

  when?: DateTimeType;

  constructor(timeStampType: TimeStampType) {
    super(timeStampType);

    this.when = timeStampType.when;
  }
}
