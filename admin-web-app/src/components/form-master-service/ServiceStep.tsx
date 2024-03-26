import { Box, styled } from '@mui/system';
import { DocumentRequired, Result, ServiceStep } from '../../api/types';
import { FormFieldText } from '../FormFieldText';
import {
  IconAddSquare,
  IconAddSquareOutLine,
  IconCopy,
  IconTrash,
  IconX,
} from '../icons';
import React from 'react';
import { Grid, Paper, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '../ErrorMessage';
import { useValidateCaller } from '../../hooks-ui/useValidateCaller';

export const ContentInfoContainer = styled('div')(() => ({
  paddingRight: 10,
  paddingY: 10,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 10,
  gap: 10,
  fontWeight: 500,
}));

export type ContentInfoProps = {
  index: number;
  stepIndex: number;
  content: string;
  placeholder: string;
  onRemoveItem: (stepIndex: number, index: number) => void;
  onChangeItem: (stepIndex: number, index: number, value: string) => void;
};

export function ContentInfoItem(props: ContentInfoProps) {
  const onRemoveItem = () => props.onRemoveItem(props.stepIndex, props.index);
  const onChangeItem = (value: string) =>
    props.onChangeItem(props.stepIndex, props.index, value);

  const translation = useTranslation();
  return (
    <ContentInfoContainer>
      <label>{`${props.index + 1}. `}</label>
      <div className={'mr-6'}>
        <FormFieldText
          value={props.content}
          onChange={onChangeItem}
          id={'result'}
          placeholder={props.placeholder}
          validateCaller={{}}
        />
      </div>
      <div className="absolute right-0 top-3 pr-2 justify-right">
        <button onClick={onRemoveItem}>
          <Tooltip
            title={translation.t('masterService.delete')}
            placement="top"
          >
            <IconX />
          </Tooltip>
        </button>
      </div>
    </ContentInfoContainer>
  );
}

export type ContentHeaderProps = {
  content: string;
  index: number;
  onAdd: (stepNumber: number, index: number) => void;
  stepIndex: number;
};

export function ContentHeader(props: ContentHeaderProps) {
  const translation = useTranslation();

  return (
    <Box>
      <div className="relative">
        <label className={'font-bold'}>{props?.content}</label>
        <div className="absolute right-0 top-0">
          <button onClick={() => props.onAdd(props?.stepIndex, props?.index)}>
            <Tooltip
              title={translation.t('masterService.addMore')}
              placement="top"
            >
              <IconAddSquare />
            </Tooltip>
          </button>
        </div>
      </div>
    </Box>
  );
}

export type ContentInfoListProps = {
  title: string;
  index: number;
  infos: ContentInfoProps[];
  stepIndex: number;
  placeholder: string;
  onAddItem: (stepIndex: number, id: number) => void;
  onRemoveItem: (stepIndex: number, id: number) => void;
  onChangeItem: (stepIndex: number, id: number, value: string) => void;
};

export function ContentInfoList(props: ContentInfoListProps) {
  return (
    <Paper>
      <Box className={'px-2 min-w-[300px] relative py-2'}>
        <ContentHeader
          index={props?.index}
          content={props?.title}
          stepIndex={props?.stepIndex}
          onAdd={props?.onAddItem}
        ></ContentHeader>

        {props.infos?.map((info, index) => (
          <ContentInfoItem
            key={info.index}
            placeholder={props.placeholder}
            index={index}
            stepIndex={props.stepIndex}
            content={info.content}
            onRemoveItem={props?.onRemoveItem}
            onChangeItem={props?.onChangeItem}
          ></ContentInfoItem>
        ))}
      </Box>
    </Paper>
  );
}

export type ServiceStepDisplayProps = {
  isSubmitted: boolean;
  serviceStep: ServiceStep[];
  onUpdateServiceStep: (value: ServiceStep[]) => void;
};

export type ServiceStepItemProps = {
  onAddResult: (stepIndex: number, resultId: number) => void;
  onRemoveResult: (stepIndex: number, resultId: number) => void;
  onAddDocumentRequire: (stepIndex: number, resultId: number) => void;
  onRemoveDocumentRequire: (stepIndex: number, documentId: number) => void;
  onChangeDocumentItem: (
    stepIndex: number,
    documentId: number,
    value: string,
  ) => void;
  onChangeResultItem: (
    stepIndex: number,
    documentId: number,
    value: string,
  ) => void;
  onChangeStepContent: (
    stepIndex: number,
    name: keyof ServiceStep,
    value: string,
  ) => void;
  onAddNewItem: () => void;
  onDeleteItem: (id: number) => void;
  onDuplicateItem: (id: number) => void;
  step: ServiceStep;
  index: number;
  disableDelete: boolean;
  isSubmitted: boolean;
};

export function ServiceStepItem(props: ServiceStepItemProps) {
  const onChangeStepValue = (value: string, name: keyof ServiceStep) => {
    if (props?.onChangeStepContent) {
      props?.onChangeStepContent(props?.index, name, value);
    }
  };
  const onDeleteItem = () => props.onDeleteItem(props.index);
  const onDuplicateItem = () => props.onDuplicateItem(props.index);
  const translation = useTranslation();
  const { validateCaller } = useValidateCaller();

  return (
    <div
      className={
        'flex space-x-10 items-center justify-right bg-zinc-50 mb-2 py-10'
      }
    >
      <p className="font-bold text-2xl pl-2">{props?.index + 1}</p>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormFieldText
            id={'name'}
            label={'name'}
            isRequired={true}
            value={props?.step?.name}
            onChange={(v) => onChangeStepValue(v, 'name')}
            validateCaller={validateCaller}
            placeholder={translation.t(
              'masterService.step.stepNamePlaceholder',
            )}
            errorComponent={
              <ErrorMessage
                message={translation.t('masterService.nameError')}
                isError={!props?.step?.name}
                showErrorMessage={props.isSubmitted}
              />
            }
          />
        </Grid>
        <Grid item md={6}>
          <FormFieldText
            id={'estimatedCompletionTime'}
            isRequired={true}
            validateCaller={validateCaller}
            label={'estimatedCompletionTime'}
            value={props?.step.estimatedCompletionTime}
            onChange={(v) => onChangeStepValue(v, 'estimatedCompletionTime')}
            placeholder={translation.t(
              'masterService.step.estimatedCompletionTimePlaceholder',
            )}
            errorComponent={
              <ErrorMessage
                message={translation.t('masterService.estimatedCompletionTime')}
                isError={!props?.step?.estimatedCompletionTime}
                showErrorMessage={props.isSubmitted}
              />
            }
          />
        </Grid>
        <Grid item md={12}>
          <FormFieldText
            id={'description'}
            label={'description'}
            validateCaller={validateCaller}
            value={props?.step.description}
            isRequired={true}
            onChange={(v) => onChangeStepValue(v, 'description')}
            placeholder={translation.t(
              'masterService.step.descriptionPlaceholder',
            )}
            errorComponent={
              <ErrorMessage
                message={translation.t('masterService.descriptionError')}
                isError={!props?.step?.description}
                showErrorMessage={props.isSubmitted}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid item md={3}>
        <ContentInfoList
          stepIndex={props?.index}
          index={0}
          title="Document Required"
          placeholder={translation.t(
            'masterService.documentRequiredPlaceholder',
          )}
          infos={
            props?.step?.documentRequired.map((doc, docIndex) => ({
              content: doc.documentRequired,
              onRemoveItem: props?.onRemoveDocumentRequire,
              index: docIndex,
              id: doc.id,
            })) as unknown as ContentInfoProps[]
          }
          onAddItem={props?.onAddDocumentRequire}
          onRemoveItem={props?.onRemoveDocumentRequire}
          onChangeItem={props?.onChangeDocumentItem}
        />
      </Grid>
      <ContentInfoList
        stepIndex={props?.index}
        index={0}
        title="Result"
        placeholder={translation.t('masterService.resultRequiredPlaceholder')}
        infos={
          props?.step?.result.map((rs, rsIndex) => ({
            content: rs.result,
            onRemoveItem: props?.onRemoveResult,
            index: rsIndex,
          })) as ContentInfoProps[]
        }
        onAddItem={props?.onAddResult}
        onRemoveItem={props?.onRemoveResult}
        onChangeItem={props?.onChangeResultItem}
      />
      <Box>
        <button onClick={props.onAddNewItem} className="mb-4">
          <Tooltip
            title={translation.t('masterService.addMore')}
            placement="top"
          >
            <IconAddSquareOutLine />
          </Tooltip>
        </button>
        <button onClick={onDuplicateItem} className="mb-4">
          <Tooltip
            title={translation.t('masterService.duplicate')}
            placement="top"
          >
            <IconCopy />
          </Tooltip>
        </button>
        <button
          onClick={onDeleteItem}
          className={`mb-4 ${props.disableDelete ? 'disabled' : ''}`}
        >
          <Tooltip
            title={translation.t('masterService.delete')}
            placement="top"
          >
            <IconTrash />
          </Tooltip>
        </button>
      </Box>
    </div>
  );
}

export function ServiceStepDisplay(props: ServiceStepDisplayProps) {
  const [stepDataList, setStepDateList] = React.useState(
    (props?.serviceStep ?? []) as ServiceStep[],
  );

  const onAddDocumentRequire = React.useCallback(
    (stepIndex: number, index: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: [
                ...step.documentRequired,
                {
                  id: step.documentRequired.length,
                  documentRequired: 'document',
                },
              ],
            };
          }
          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onAddResultRequired = React.useCallback(
    (stepIndex: number, value: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: [
                ...step.result,
                { id: step.result.length, result: 'result' },
              ],
            };
          }
          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onRemoveDocumentRequire = React.useCallback(
    (stepIndex: number, documentId: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: step.documentRequired?.filter(
                (doc, docId) => docId !== documentId,
              ),
            };
          }
          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onRemoveResultRequire = React.useCallback(
    (stepIndex: number, resultId: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: step.result.filter((rs, rsId) => rsId !== resultId),
            };
          }
          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onChangeResultItem = React.useCallback(
    (stepIndex: number, resultId: number, value: string) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              result: step.result.map((rs, rsId) => {
                if (rsId === resultId) {
                  return { ...rs, result: value };
                }
                return rs;
              }),
            };
          }
          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onChangeDocumentItem = React.useCallback(
    (stepIndex: number, resultId: number, value: string) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              documentRequired: step.documentRequired.map((doc, docId) => {
                if (docId === resultId) {
                  return { ...doc, documentRequired: value };
                }
                return doc;
              }),
            };
          }
          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onChangeStepContent = React.useCallback(
    (stepIndex: number, name: keyof ServiceStep, value: string) => {
      setStepDateList((stepDataList) =>
        stepDataList?.map((step, index) => {
          if (index === stepIndex) {
            return {
              ...step,
              [name]: value,
            };
          }

          return step;
        }),
      );
    },
    [stepDataList],
  );

  const onAddNewItem = React.useCallback(() => {
    setStepDateList([
      ...stepDataList,
      {
        id: stepDataList.length,
        stepNo: '',
        name: '',
        estimatedCompletionTime: '',
        description: '',
        result: [] as Result[],
        documentRequired: [] as DocumentRequired[],
      } as unknown as ServiceStep,
    ]);
  }, [stepDataList]);

  const onDeleteItem = React.useCallback(
    (id: number) => {
      setStepDateList((stepDataList) =>
        stepDataList?.filter((item, sid) => {
          return sid !== id;
        }),
      );
    },
    [stepDataList],
  );

  const onDuplicateItem = React.useCallback(
    (id: number) => {
      const newItem = stepDataList?.find((item, sid) => sid === id);

      if (newItem) {
        setStepDateList([...stepDataList, newItem]);
      }
    },
    [stepDataList],
  );
  React.useEffect(() => {
    props.onUpdateServiceStep(stepDataList);
  }, [stepDataList]);

  return (
    <Box>
      {stepDataList.map((step, index) => (
        <div key={`${index}`} className="px-2 rounded-2xl mb-2 default-box">
          <ServiceStepItem
            step={step}
            index={index}
            onChangeStepContent={onChangeStepContent}
            onAddDocumentRequire={onAddDocumentRequire}
            onRemoveDocumentRequire={onRemoveDocumentRequire}
            onChangeDocumentItem={onChangeDocumentItem}
            onChangeResultItem={onChangeResultItem}
            onAddResult={onAddResultRequired}
            onRemoveResult={onRemoveResultRequire}
            onDuplicateItem={onDuplicateItem}
            onAddNewItem={onAddNewItem}
            onDeleteItem={onDeleteItem}
            disableDelete={Boolean(stepDataList.length === 1)}
            isSubmitted={props.isSubmitted}
          ></ServiceStepItem>
        </div>
      ))}
    </Box>
  );
}
