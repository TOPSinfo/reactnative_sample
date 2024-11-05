import React, { useState, useEffect, useRef } from 'react';
import { Text, FlatList, TouchableOpacity, ActivityIndicator, View, Animated, Alert, RefreshControl } from 'react-native';

import EmptyResults from '@components/EmptyResults';
import Session from '@components/Session';
import lastChild from '@utils/lastChild';
import { ScreenProps, Session as SessionType } from '@types';

import card from '@styles/shared/card';
import { Colors, Fonts } from '@styles';
import useSessions from '@hooks/useSessions';
import { RootState } from '@redux/reducers/root';
import { useSelector } from 'react-redux';
import { getSessionHistory } from '@redux/actions/sessions';

interface Props {
  sessions: SessionType[] | undefined;
  active: boolean;
  componentId: ScreenProps['componentId'];
}
const REFRESH_HIGHT = 100
const SessionsList: React.FC<Props> = ({ sessions, active, componentId, }) => {
  const { getSessions } = useSessions();
  const [page, setPage] = useState(10)
  const [loadMore, setLoadMore] = useState(false)
  const sessionActivityLoader = useSelector((state: RootState) => state.tabReducer.sessionLoader)


  if (!sessions?.length) {
    return (
      <EmptyResults
        title="noActiveSessions"
        message="noActiveSessionsMessage"
      />
    );
  }

  /**
   * Loads more data by incrementing the page number and setting a loading state.
   * 
   * This function sets the `loadMore` state to `true` to indicate that more data is being loaded.
   * After a delay of 1 second, it increments the `page` state by 10 and then sets the `loadMore` state back to `false`.
   * 
   * @private
   */
  const _loadMoreData = () => {
    setLoadMore(true)
    setTimeout(() => {
      setPage(page + 10)
      setLoadMore(false)
    }, 1000)
  }
  const _FooterView = () => {
    if (!active && sessions.length > page) {
      return (
        <TouchableOpacity disabled={loadMore} onPress={() => _loadMoreData()}
          style={{
            alignSelf: 'center',
            marginVertical: 10,
            padding: 10,
            backgroundColor: Colors.Heather,
            width: '85%',
            borderRadius: 5,
            alignItems: 'center'
          }}>{
            loadMore ? <ActivityIndicator size={'small'} color={Colors.BaliHai} /> :
              <Text style={{ ...Fonts.mediumBold, color: Colors.Fiord }}>Load more</Text>
          }
        </TouchableOpacity>
      )
    } else {
      return <View />
    }
  }

  return (
    <>
      <FlatList
        data={active ? sessions : sessions.length > page ? sessions.slice(0, page) : sessions}
        extraData={sessions}
        keyExtractor={({ recordID }) => recordID}
        ListFooterComponent={_FooterView()}
        refreshControl={<RefreshControl
          refreshing={sessionActivityLoader}
          onRefresh={() => active ? getSessions() : getSessionHistory()}
          tintColor={Colors.CuriousBlue}
        />}
        renderItem={({ item, index }) => (
          <Session
            session={item}
            active={active}
            componentId={componentId}
            style={[
              card.item,
              lastChild(index, sessions.length) && card.itemLast,
            ]}
          />
        )}
      />
    </>

  );
};

export default SessionsList;
