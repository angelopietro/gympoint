import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { useSelector } from 'react-redux';

import UserHeader from '~/components/UserHeader';
import UserStatus from '~/components/UserStatus';

import {
  Container,
  CheckInList,
  CheckInItem,
  CheckInTitle,
  CheckInDate,
  Loading,
  ButtonSubmit,
} from './styles';

import api from '~/services/api';

import { formatDistanceDate } from '~/util/format';

function Checkins({ isFocused }) {
  const { student_id, active } = useSelector(state => state.auth.user);

  const [checkins, setCheckins] = useState([]);
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadCheckins(pageNumber = page, shouldRefresh = false) {
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
        dateCheckin: formatDistanceDate(response.createdAt),
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
    if (isFocused) {
      loadCheckins(1, true);
    }
  }, [isFocused]); // eslint-disable-line

  async function handleNewCheckin() {
    try {
      setLoading(true);
      await api.post(`/students/${student_id}/checkins`);
      Alert.alert('Sucesso', 'Seu check-in foi realizado com sucesso!');
      await loadCheckins(1, true);
    } catch (error) {
      if (error) {
        Alert.alert('Atenção!', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmCheckin() {
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
    await loadCheckins(1, true);
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

  return (
    <Container>
      <UserHeader />
      <ButtonSubmit onPress={handleConfirmCheckin} enabled={active}>
        Novo check-in
      </ButtonSubmit>

      {!active && <UserStatus />}

      <CheckInList
        data={checkins}
        keyExtractor={(item, index) => String(index)}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadCheckins()}
        renderItem={active && renderItem}
        ListFooterComponent={isLoading && <Loading />}
      />
    </Container>
  );
}

export default withNavigationFocus(Checkins);
