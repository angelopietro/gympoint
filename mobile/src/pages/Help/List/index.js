import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* -----COMPONENTS----- */
import Button from '~/components/Button';

/* -----STYLES----- */
import {
  Container,
  HelpList,
  Card,
  CardView,
  CardHeader,
  CardInfo,
  InfoIcon,
  InfoText,
  InfoDate,
  QuestionBody,
  QuestionText,
  Loading,
} from './styles';

/* -----SERVICES----- */
import api from '~/services/api';

/* -----UTIL----- */
import { customFormatDate } from '~/util/format';

function List({ navigation }) {
  const { student_id } = useSelector(state => state.auth.user);

  const [doubts, setDoubt] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadHelps(pageNumber = page, shouldRefresh = false) {
    setLoading(true);
    try {
      if (totalPages && pageNumber > totalPages) return;

      const { data } = await api.get(`/students/${student_id}/help-orders`, {
        params: {
          page: pageNumber,
        },
      });

      const requests = await data.docs.map(response => ({
        ...response,
        created_at: customFormatDate(response.created_at),
        answered_at: response.answer
          ? customFormatDate(response.answer_at)
          : null,
      }));

      setDoubt(shouldRefresh ? requests : [...doubts, ...requests]);
      setTotalPages(data.pages);
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
    loadHelps();
  }, []); // eslint-disable-line

  useEffect(() => {
    navigation.addListener('willFocus', async () => {
      await loadHelps(1, true);
    });
  }, [navigation]); // eslint-disable-line

  function handleNew() {
    navigation.navigate('HelpNew');
  }

  function handleDetail(help) {
    navigation.navigate('HelpDetail', { help });
  }

  async function refreshList() {
    setRefreshing(true);
    await loadHelps(1, true);
    setRefreshing(false);
  }

  function renderItem(data) {
    const { item } = data;
    const { answer, created_at, question } = item;

    return (
      <Card onPress={() => handleDetail(item)} enabled={!!item.answer}>
        <CardView>
          <CardHeader>
            <CardInfo>
              <InfoIcon name="check-circle" size={20} answered={answer} />
              <InfoText answered={item.answer}>
                {answer ? 'Respondido' : 'Sem resposta'}
              </InfoText>
            </CardInfo>
            <InfoDate>{created_at}</InfoDate>
          </CardHeader>
          <QuestionBody>
            <QuestionText>{question}</QuestionText>
          </QuestionBody>
        </CardView>
      </Card>
    );
  }

  return (
    <Container>
      <Button onPress={handleNew}>Novo pedido de auxílio</Button>
      <HelpList
        data={doubts}
        keyExtractor={(item, index) => String(index)}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadHelps()}
        renderItem={renderItem}
        ListFooterComponent={isLoading && <Loading />}
      />
    </Container>
  );
}

List.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(List);
