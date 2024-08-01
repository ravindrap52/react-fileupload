import { model, Schema } from 'mongoose';

interface CSV {
    timestamp: Date;
    active_power_kW: number;
    energy_kWh: number;
}

const csvSchema: Schema = new Schema<CSV>({
  timestamp: {
    type: Date
  },
  active_power_kW: {
    type: Number
  },
  energy_kWh: {
    type: Number
  }
});

export const csv = model('Csv', csvSchema);