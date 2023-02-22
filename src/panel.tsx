import React from 'react';
import { PanelProps } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
import { Layout, Point, PsyOptions, StyleOptions } from './types';
// import { State } from './state';
import { Container } from './container';
import { format } from './formatter';
import { PsyState } from './psystate';
import { Psychart } from './psychart';
import { Color } from './color';

interface Props extends PanelProps<PsyOptions> { }

export const PsyPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const isLightTheme = useTheme2().isLight;
  try {
    const layout = { padding: 30, size: { x: width, y: height } } as Layout,
      style = {
        darkTheme: !isLightTheme,
        fontColor: isLightTheme ? new Color(32, 32, 32) : new Color(208, 208, 208),
        lineColor: isLightTheme ? new Color(224, 224, 224) : new Color(48, 48, 48),
        fontSize: 12,
        resolution: 0.5,
        major: 10,
      } as StyleOptions,
      psychart = new Psychart(layout, options, style),
      formatted = format(data),
      startTime = data.timeRange.from.unix() * 1e3,
      endTime = data.timeRange.to.unix() * 1e3;
    for (let t in formatted) {
      switch (options.measurements) {
        case ('dbwb'): {
          psychart.plot({ db: formatted[t][options.dryBulb], wb: formatted[t][options.wetBulb] }, +t, startTime, endTime);
          break;
        }
        case ('dbrh'): {
          psychart.plot({ db: formatted[t][options.dryBulb], rh: formatted[t][options.relHum] }, +t, startTime, endTime);
          break;
        }
        case ('dbdp'): {
          psychart.plot({ db: formatted[t][options.dryBulb], dp: formatted[t][options.dewPoint] }, +t, startTime, endTime);
          break;
        }
        default: {
          throw new Error('Invalid measurement type.');
        }
      }
    }
    // psychart.plot({ db: 60, dp: 40 }, displayOpts);
    // psychart.plot({ db: 70, wb: 50 }, displayOpts);
    // psychart.plot({ db: 80, rh: .3 }, displayOpts);
    // psychart.drawRegion([
    //   { db: 50, rh: .3 },
    //   { db: 80, rh: .3 },
    //   { db: 80, dp: 60 },
    //   { db: 75, dp: 60 },
    // ], new Color(0, 255, 80, 50), 'Testing!\nhello!');
    // psychart.drawRegions(options., [new Color(255, 255, 0), new Color(0, 0, 255)]);
    return <Container child={psychart.getElement()} />;
    // return <Container child={State(width, height, options, isLightTheme, format(data))} />;
  } catch (ex: any) {
    console.error(ex); // TODO: remove (testing only)
    return (
      <div className="panel-empty">
        <p>{ex.name + ': ' + ex.message}</p>
      </div>
    );
  }
};
