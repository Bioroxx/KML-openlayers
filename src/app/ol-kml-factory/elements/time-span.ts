import {DateTimeType, TimeSpanType} from '@bioroxx/kmljs';
import {AbstractTimePrimitiveGroup} from './abstract-time-primitive-group';

export class TimeSpan extends AbstractTimePrimitiveGroup implements TimeSpanType {

  begin?: DateTimeType;
  end?: DateTimeType;

  constructor(timeSpanType: TimeSpanType) {
    super(timeSpanType);

    this.begin = timeSpanType.begin;
    this.end = timeSpanType.end;
  }
}
