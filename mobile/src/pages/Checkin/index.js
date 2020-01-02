import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* -----COMPONENTS----- */
import UserStatus from '~/components/UserStatus';

/* -----STYLES----- */
import {
  Container,
  CheckInList,
  CheckInItem,
  CheckInTitle,
  CheckInDate,
  Loading,
  ButtonSubmit,
} from './styles';

/* -----SERVICES----- */
import api from '~/services/api';

/* -----UTIL----- */
import { customFormatDate } from '~/util/format';

function Checkin({ navigation }) {
  const { student_id, active } = useSelector(state => state.auth.user);

  console.tron.log(student_id);
  const [checkins, setCheckins] = useState([]);
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadCheckin(pageNumber = page, shouldRefresh = false) {
    setLoading(true);

    try {
      if (totalPages && pageNumber > totalPages) return;

      const { data } = await api.get(`/students/${student_id}/checkins`, {
        params: {
          page: pageNumber,
        },
      });

      const listCheckins = await data.docs.map(response => ({
        id: response.id,
        active: response.active,
        dateCheckin: customFormatDate(response.createdAt),
      }));

      setCheckins(
        shouldRefresh ? listCheckins : [...checkins, ...listCheckins]
      );
      setTotalPages(data.totalPages);
      setTotalCheckins(data.totalDocs);
      setPage(pageNumber + 1);
    } catch (error) {
      if (error.response.data.error) {
        Alert.alert('Atenção!', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCheckin();
  }, []); // eslint-disable-line

  useEffect(() => {
    navigation.addListener('willFocus', async () => {
      await loadCheckin(1, true);
    });
  }, [navigation]); // eslint-disable-line

  async function handleNewCheckin() {
    try {
      await api.post(`/students/${student_id}/checkins`);
      Alert.alert('Sucesso', 'Seu check-in foi realizado com sucesso!');
      setLoading(true);
      await loadCheckin(1, true);
    } catch (error) {
      if (error) {
        Alert.alert('Atenção!', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckin() {
    Alert.alert(
      'Confirmação de Check-in',
      'Você deseja realizar um novo chekin?',
      [
        { text: 'CANCELAR' },
        { text: 'COMFIRMAR', onPress: () => handleNewCheckin() },
      ],
      { cancelable: true }
    );
  }

  async function refreshList() {
    setRefreshing(true);
    await loadCheckin(1, true);
    setRefreshing(false);
  }

  function renderItem(data) {
    const { index, item } = data;

    return (
      <CheckInItem>
        <CheckInTitle>{`Check-in #${totalCheckins - index}`}</CheckInTitle>
        <CheckInDate>{item.dateCheckin}</CheckInDate>
      </CheckInItem>
    );
  }

  console.tron.log(active);

  return (
    <Container>
      <ButtonSubmit onPress={handleCheckin} enabled={active}>
        Novo check-in
      </ButtonSubmit>

      {!active && <UserStatus />}

      <CheckInList
        data={checkins}
        keyExtractor={(item, index) => String(index)}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadCheckin()}
        renderItem={active && renderItem}
        ListFooterComponent={isLoading && <Loading />}
      />
    </Container>
  );
}

Checkin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
export default withNavigationFocus(Checkin);
