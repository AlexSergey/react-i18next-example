import { List } from 'antd';
import { TodoItem } from '../TodoItem';
import { useTranslation } from 'react-i18next';

export const TodoList = ({
  todos,
  onTodoRemoval,
  onTodoToggle,
}) => {
  const { t } = useTranslation();
  return (
    <List
      locale={{
        emptyText: t('empty_list'),
      }}
      dataSource={todos}
      renderItem={(todo) => (
        <TodoItem
          todo={todo}
          onTodoToggle={onTodoToggle}
          onTodoRemoval={onTodoRemoval}
        />
      )}
      pagination={{
        position: 'bottom',
        pageSize: 50,
      }}
    />
  );
};
