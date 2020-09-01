import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, PieChart, AreaChart, LineChart } from 'react-d3-components';

import {
  Container,
  Header,
  HeaderContent,
  Title,
  Content,
  Visualizations,
  Visualization,
} from './styles';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      /* response.data:
       "eventid"
       "iyear"
       "imonth"
       "iday"
       "country_txt"
       "region_txt"
       "provstate"
       "city"
       "latitude"
       "longitude"
       "specificity"
       "vicinity"
       "location"
       "summary"
       "alternative_txt"
       "success"
       "suicide"
       "attacktype1_txt
       "targtype1_txt
       "corp1"
       "target1"
       "natlty1_txt"
       "gname"
       "motive"
       "weaptype1_txt"
       "nkill"
      */
      const response = await api.get('/data');
      setData(response.data);
    }
    loadData();
  }, []);

  // Bar Chart Datas
  const barChartData1 = useMemo(() => {
    return [{
      label: 'attacksInFiveYears',
      values: [
        { x: '1970-1974', y: data.filter(item => item.iyear >= '1970' && item.iyear <= '1974').length },
        { x: '1975-1979', y: data.filter(item => item.iyear >= '1975' && item.iyear <= '1979').length },
        { x: '1980-1984', y: data.filter(item => item.iyear >= '1980' && item.iyear <= '1984').length },
        { x: '1985-1989', y: data.filter(item => item.iyear >= '1985' && item.iyear <= '1989').length },
        { x: '1990-1994', y: data.filter(item => item.iyear >= '1990' && item.iyear <= '1994').length },
        { x: '1995-1999', y: data.filter(item => item.iyear >= '1995' && item.iyear <= '1999').length },
        { x: '2000-2004', y: data.filter(item => item.iyear >= '2000' && item.iyear <= '2004').length },
        { x: '2005-2009', y: data.filter(item => item.iyear >= '2005' && item.iyear <= '2009').length },
        { x: '2010-2014', y: data.filter(item => item.iyear >= '2010' && item.iyear <= '2014').length },
        { x: '2015-2018', y: data.filter(item => item.iyear >= '2015' && item.iyear <= '2018').length }
      ]
    }]
  }, [data]);

  const barChartData2 = useMemo(() => {
    let firstGroupKey = '', secondGroupKey = '', thirdGroupKey = '', fourthGroupKey = '', fifthGroupKey = '';
    let firstGroupValue = 0, secondGroupValue = 0, thirdGroupValue = 0, fourthGroupValue = 0, fifthGroupValue = 0;
    let keyTemp = 0, valueTemp = 0;

    const allGroupsData = data.reduce((acc, e) => { acc[e.gname] = (e.gname in acc ? acc[e.gname] + 1 : 1); return acc }, {});

    for (var [key, value] of Object.entries(allGroupsData)) {
      if (key !== 'Unknown') {
        if (value > fifthGroupValue) {
          fifthGroupKey = key;
          fifthGroupValue = value;
        }
        if (fifthGroupValue > fourthGroupValue) {
          keyTemp = fourthGroupKey;
          valueTemp = fourthGroupValue;

          fourthGroupValue = fifthGroupValue;
          fourthGroupKey = fifthGroupKey;

          fifthGroupKey = keyTemp;
          fifthGroupValue = valueTemp;
        }
        if (fourthGroupValue > thirdGroupValue) {
          keyTemp = thirdGroupKey;
          valueTemp = thirdGroupValue;

          thirdGroupValue = fourthGroupValue;
          thirdGroupKey = fourthGroupKey;

          fourthGroupKey = keyTemp;
          fourthGroupValue = valueTemp;
        }
        if (thirdGroupValue > secondGroupValue) {
          keyTemp = secondGroupKey;
          valueTemp = secondGroupValue;

          secondGroupValue = thirdGroupValue;
          secondGroupKey = thirdGroupKey;

          thirdGroupKey = keyTemp;
          thirdGroupValue = valueTemp;
        }
        if (secondGroupValue > firstGroupValue) {
          keyTemp = firstGroupKey;
          valueTemp = firstGroupValue;

          firstGroupValue = secondGroupValue;
          firstGroupKey = secondGroupKey;

          secondGroupKey = keyTemp;
          secondGroupValue = valueTemp;
        }
      }
    }
    return [{
      label: 'fiveLargestGroups',
      values: [
        { x: firstGroupKey, y: firstGroupValue },
        { x: secondGroupKey, y: secondGroupValue },
        { x: thirdGroupKey, y: thirdGroupValue },
        { x: fourthGroupKey, y: fourthGroupValue },
        { x: fifthGroupKey, y: fifthGroupValue },
      ]
    }]
  }, [data]);

  // Group Bar Chart Datas
  const groupBarChart1 = useMemo(() => {
    // Iraq
    const iraqFilter = data.filter(item => item.country_txt === 'Iraq');
    const iraqReduce = iraqFilter.reduce((acc, item) => {
      acc[item.nkill] = [...(acc[item.nkill] || []), item.nkill];
      return acc;
    }, {});

    let tempNumberKills = 0;

    let iraqFirstNumberKills = 0;
    let iraqSecondNumberKills = 0;

    for (var [key, value] of Object.entries(iraqReduce)) {
      if (key !== 0) {
        if (value[0] > iraqSecondNumberKills) {
          iraqSecondNumberKills = value[0];
        }
        if (iraqSecondNumberKills > iraqFirstNumberKills) {
          tempNumberKills = iraqFirstNumberKills;
          iraqFirstNumberKills = iraqSecondNumberKills;
          iraqSecondNumberKills = tempNumberKills;
        }
      }
    }

    // Afghanistan
    const afghanistanFilter = data.filter(item => item.country_txt === 'Afghanistan');
    const afghanistanReduce = afghanistanFilter.reduce((acc, item) => {
      acc[item.nkill] = [...(acc[item.nkill] || []), item.nkill];
      return acc;
    }, {});

    let afghanistanFirstNumberKills = 0;
    let afghanistanSecondNumberKills = 0;

    for (var [key, value] of Object.entries(afghanistanReduce)) {
      if (key !== 0) {
        if (value[0] > afghanistanSecondNumberKills) {
          afghanistanSecondNumberKills = value[0];
        }
        if (afghanistanSecondNumberKills > afghanistanFirstNumberKills) {
          tempNumberKills = afghanistanFirstNumberKills;
          afghanistanFirstNumberKills = afghanistanSecondNumberKills;
          afghanistanSecondNumberKills = tempNumberKills;
        }
      }
    }

    // Pakistan
    const pakistanFilter = data.filter(item => item.country_txt === 'Pakistan');
    const pakistanReduce = pakistanFilter.reduce((acc, item) => {
      acc[item.nkill] = [...(acc[item.nkill] || []), item.nkill];
      return acc;
    }, {});

    let pakistanFirstNumberKills = 0;
    let pakistanSecondNumberKills = 0;

    for (var [key, value] of Object.entries(pakistanReduce)) {
      if (key !== 0) {
        if (value[0] > pakistanSecondNumberKills) {
          pakistanSecondNumberKills = value[0];
        }
        if (pakistanSecondNumberKills > pakistanFirstNumberKills) {
          tempNumberKills = pakistanFirstNumberKills;
          pakistanFirstNumberKills = pakistanSecondNumberKills;
          pakistanSecondNumberKills = tempNumberKills;
        }
      }
    }

    const finalData = [
      {
        label: 'GroupedBar1',
        values: [{ x: 'Iraq', y: parseInt(iraqSecondNumberKills) }, { x: 'Afghanistan', y: parseInt(afghanistanSecondNumberKills) }, { x: 'Pakistan', y: parseInt(pakistanSecondNumberKills) }]
      },
      {
        label: 'GroupedBar2',
        values: [{ x: 'Iraq', y: parseInt(iraqFirstNumberKills) }, { x: 'Afghanistan', y: parseInt(afghanistanFirstNumberKills) }, { x: 'Pakistan', y: parseInt(pakistanFirstNumberKills) }]
      }
    ]
    return finalData;
  }, [data]);

  const groupBarChart2 = useMemo(() => {
    // Brazil
    const brazilFilter = data.filter(item => item.country_txt === 'Brazil');
    const brazilReduce = brazilFilter.reduce((acc, item) => {
      acc[item.nkill] = [...(acc[item.nkill] || []), item.nkill];
      return acc;
    }, {});

    let tempNumberKills = 0;

    let brazilFirstNumberKills = 0;
    let brazilSecondNumberKills = 0;

    for (var [key, value] of Object.entries(brazilReduce)) {
      if (key !== 0) {
        if (value[0] > brazilSecondNumberKills) {
          brazilSecondNumberKills = value[0];
        }
        if (brazilSecondNumberKills > brazilFirstNumberKills) {
          tempNumberKills = brazilFirstNumberKills;
          brazilFirstNumberKills = brazilSecondNumberKills;
          brazilSecondNumberKills = tempNumberKills;
        }
      }
    }

    // United Kingdom
    const unitedKingdomFilter = data.filter(item => item.country_txt === 'United Kingdom');
    const unitedKingdomReduce = unitedKingdomFilter.reduce((acc, item) => {
      acc[item.nkill] = [...(acc[item.nkill] || []), item.nkill];
      return acc;
    }, {});

    let unitedKingdomFirstNumberKills = 0;
    let unitedKingdomSecondNumberKills = 0;

    for (var [key, value] of Object.entries(unitedKingdomReduce)) {
      if (key !== 0) {
        if (value[0] > unitedKingdomSecondNumberKills) {
          unitedKingdomSecondNumberKills = value[0];
        }
        if (unitedKingdomSecondNumberKills > unitedKingdomFirstNumberKills) {
          tempNumberKills = unitedKingdomFirstNumberKills;
          unitedKingdomFirstNumberKills = unitedKingdomSecondNumberKills;
          unitedKingdomSecondNumberKills = tempNumberKills;
        }
      }
    }

    // United States
    const unitedStatesFilter = data.filter(item => item.country_txt === 'United States');
    const unitedStatesReduce = unitedStatesFilter.reduce((acc, item) => {
      acc[item.nkill] = [...(acc[item.nkill] || []), item.nkill];
      return acc;
    }, {});

    let unitedStatesFirstNumberKills = 0;
    let unitedStatesSecondNumberKills = 0;

    for (var [key, value] of Object.entries(unitedStatesReduce)) {
      if (key !== 0) {
        if (value[0] > unitedStatesSecondNumberKills) {
          unitedStatesSecondNumberKills = value[0];
        }
        if (unitedStatesSecondNumberKills > unitedStatesFirstNumberKills) {
          tempNumberKills = unitedStatesFirstNumberKills;
          unitedStatesFirstNumberKills = unitedStatesSecondNumberKills;
          unitedStatesSecondNumberKills = tempNumberKills;
        }
      }
    }

    const finalData = [
      {
        label: 'GroupedBar1',
        values: [{ x: 'Brazil', y: parseInt(brazilSecondNumberKills) }, { x: 'United Kingdom', y: parseInt(unitedKingdomSecondNumberKills) }, { x: 'United States', y: parseInt(unitedStatesSecondNumberKills) }]
      },
      {
        label: 'GroupedBar2',
        values: [{ x: 'Brazil', y: parseInt(brazilFirstNumberKills) }, { x: 'United Kingdom', y: parseInt(unitedKingdomFirstNumberKills) }, { x: 'United States', y: parseInt(unitedStatesFirstNumberKills) }]
      }
    ]
    return finalData;
  }, [data]);

  // Pie Chart Datas:
  const pieChartData1 = useMemo(() => {
    let firstCountryKey = '', secondCountryKey = '', thirdCountryKey = '';
    let firstCountryValue = 0, secondCountryValue = 0, thirdCountryValue = 0;
    let keyTemp = 0, valueTemp = 0;

    const allCountriesData = data.reduce((acc, e) => { acc[e.country_txt] = (e.country_txt in acc ? acc[e.country_txt] + 1 : 1); return acc }, {});

    for (var [key, value] of Object.entries(allCountriesData)) {
      if (value > thirdCountryValue) {
        thirdCountryKey = key;
        thirdCountryValue = value;
      }
      if (thirdCountryValue > secondCountryValue) {
        keyTemp = secondCountryKey;
        valueTemp = secondCountryValue;

        secondCountryValue = thirdCountryValue;
        secondCountryKey = thirdCountryKey;

        thirdCountryKey = keyTemp;
        thirdCountryValue = valueTemp;
      }
      if (secondCountryValue > firstCountryValue) {
        keyTemp = firstCountryKey;
        valueTemp = firstCountryValue;

        firstCountryValue = secondCountryValue;
        firstCountryKey = secondCountryKey;

        secondCountryKey = keyTemp;
        secondCountryValue = valueTemp;
      }
    }
    return {
      label: 'ThreeCountriesWithMoreAttacks',
      values: [
        { x: `${firstCountryKey}: ${firstCountryValue} ataques.`, y: firstCountryValue },
        { x: `${secondCountryKey}: ${secondCountryValue} ataques.`, y: secondCountryValue },
        { x: `${thirdCountryKey}: ${thirdCountryValue} ataques.`, y: thirdCountryValue },
      ]
    }
  }, [data]);

  const pieChartData2 = useMemo(() => {
    let success = 0, noSuccess = 0;
    const allAttackSuccess = data.reduce((acc, e) => { acc[e.success] = (e.success in acc ? acc[e.success] + 1 : 1); return acc }, {});

    noSuccess = allAttackSuccess[0];
    success = allAttackSuccess[1];

    return {
      label: 'allAttackSuccess',
      values: [
        { x: `Executados: ${success}.`, y: success },
        { x: `Interceptados: ${noSuccess}.`, y: noSuccess },
      ]
    }
  }, [data]);

  // Area Chart Datas:
  const areaChartData1 = useMemo(() => {
    return [{
      label: 'Brazil',
      values: [
        { x: '1970', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear === '1970').length },
        { x: '1980', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '1980').length },
        { x: '1990', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '1990').length },
        { x: '2000', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '2000').length },
        { x: '2010', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '2010').length },
        { x: '2018', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '2018').length },
      ]
    }]
  }, [data]); ad

  const areaChartData2 = useMemo(() => {
    return [{
      label: 'USA',
      values: [
        { x: '1970', y: data.filter(item => item.country_txt === 'United States' && item.iyear === '1970').length },
        { x: '1980', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '1980').length },
        { x: '1990', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '1990').length },
        { x: '2000', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '2000').length },
        { x: '2010', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '2010').length },
        { x: '2018', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '2018').length },
      ]
    }]
  }, [data]);

  // Line Chart Datas:
  const lineChartData1 = useMemo(() => {
    return [{
      label: 'Brazil',
      values: [
        { x: '1970', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear === '1970').length },
        { x: '1980', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '1980').length },
        { x: '1990', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '1990').length },
        { x: '2000', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '2000').length },
        { x: '2010', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '2010').length },
        { x: '2018', y: data.filter(item => item.country_txt === 'Brazil' && item.iyear <= '2018').length },
      ]
    }]
  }, [data]);

  const lineChartData2 = useMemo(() => {
    return [{
      label: 'USA',
      values: [
        { x: '1970', y: data.filter(item => item.country_txt === 'United States' && item.iyear === '1970').length },
        { x: '1980', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '1980').length },
        { x: '1990', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '1990').length },
        { x: '2000', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '2000').length },
        { x: '2010', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '2010').length },
        { x: '2018', y: data.filter(item => item.country_txt === 'United States' && item.iyear <= '2018').length },
      ]
    }]
  }, [data]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="D3" />
          <Title>
            <h1>Visualizações: Global Terrorism Database (GTD)</h1>
          </Title>
        </HeaderContent>
      </Header>
      <Content>
        <Visualizations>
          <h1>Carregamento dos dados</h1>
          <p>
            Aguarde até 1 min para o carregamento dos mais de 190.000 registros. Certifique-se que a fake api esteja executando.
          </p>
          <Visualization>
            <div>
              <h1>
                Bar Chart
              </h1>
              <p>
                Ocorrência de atentados em um intervalo de 5 em 5 anos, nos anos de 1970 a 2018:
              </p>
              <BarChart
                data={barChartData1}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Bar Chart
              </h1>
              <p>
                Os 5 grupos que mais cometeram atentados entre os anos de 1970 a 2018:
              </p>
              <BarChart
                data={barChartData2}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                colorByLabel={false} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Grouped Bar Chart
              </h1>
              <p>
                Número de vítimas nos dois maiores ataques ocorridos no Iraque, Afeganistão e Paquistão.
              </p>
              <BarChart
                groupedBars
                data={groupBarChart1}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Grouped Bar Chart
              </h1>
              <p>
                Número de vítimas nos dois maiores ataques ocorridos no Brasil, Reino Unido e EUA.
              </p>
              <BarChart
                groupedBars
                data={groupBarChart2}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Pie Chart
              </h1>
              <p>
                Os 3 países que mais sofreram atendados entre os anos de 1970 a 2018:
              </p>
              <PieChart
                data={pieChartData1}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Pie Chart
              </h1>
              <p>
                Quantidade de Ataques executados vs interceptados (desde 1970):
              </p>
              <PieChart
                data={pieChartData2}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Area Chart
              </h1>
              <p>
                Brasil - Acúmulo da quantidade de atentados terroristas em cada década (desde 1970):
              </p>
              <AreaChart
                data={areaChartData1}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Area Chart
              </h1>
              <p>
                EUA - Acúmulo da quantidade de atentados terroristas em cada década (desde 1970):
              </p>
              <AreaChart
                data={areaChartData2}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Line Chart
              </h1>
              <p>
                Brasil - Acúmulo da quantidade de atentados terroristas em cada década (desde 1970):
              </p>
              <LineChart
                data={lineChartData1}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
          <Visualization>
            <div>
              <h1>
                Line Chart
              </h1>
              <p>
                EUA - Acúmulo da quantidade de atentados terroristas em cada década (desde 1970):
              </p>
              <LineChart
                data={lineChartData2}
                width={1200}
                height={800}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            </div>
          </Visualization>
        </Visualizations>
      </Content>
    </Container>
  );
};

export default Dashboard;