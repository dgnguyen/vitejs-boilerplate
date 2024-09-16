import React, { useState } from 'react'

import { Box, Button, Snackbar } from '@mui/material'

import WarnIcon from 'assets/images/icons/warnYellowIcon.svg'
import Modal from 'components/Commons/MuiModal'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'hooks/useSnackbar'
import { useDispatch, useSelector } from 'react-redux'
import { updateBetAllowStatus } from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import * as Yup from 'yup'

import styles from './style.module.scss'

export enum langEnum {
  eng = 1,
  kor,
}

const BetStatusEditModal: React.FC<{
  onModalHide: () => void
  isMsgEdit: boolean
}> = ({ onModalHide, isMsgEdit }) => {
  const dispatch = useAppDispatch()
  const marketSelector = useSelector((state: RootState) => state.market)
  const { status, betAllowedMsgEnglish, betAllowedMsgKorean } =
    marketSelector.betAllowed
  const [contents, setContents] = useState({
    [langEnum.eng]: betAllowedMsgEnglish,
    [langEnum.kor]: betAllowedMsgKorean,
  })

  const [selectedLang, setSelectedLang] = useState(langEnum.eng)
  const [textAreaLength, setTextAreaLength] = useState(
    contents[selectedLang]?.length
  )
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()
  const handleSubmit = async (
    { password }: { password: string },
    isMsgEdit: boolean
  ) => {
    try {
      const res = await dispatch(
        updateBetAllowStatus(isMsgEdit ? status : !status, contents, password)
      )
      if (res.isSuccess) {
        openSnackbar({
          message: isMsgEdit ? (
            <p>
              Message successfully <span className={'color-green'}>edited</span>
            </p>
          ) : (
            <p>
              The Markets are turned{' '}
              {status ? (
                <span className={'color-red'}>OFF</span>
              ) : (
                <span className={'color-green'}>ON</span>
              )}{' '}
              <br /> successfully
            </p>
          ),
        })
        onModalHide()
      } else {
        openSnackbar({ message: 'Error while open / close game' })
      }
    } catch (err) {
      console.error(err)
      openSnackbar({ message: 'Error while open / close game' })
    }
  }

  const rendWarnText = (isMsgEdit = false) => {
    if (isMsgEdit)
      return (
        <p className={styles.warnText}>
          You are trying to change the message, please confirm.
        </p>
      )

    if (status)
      return (
        <p className={styles.warnText}>
          Turning <b>OFF</b> the Markets{' '}
          <b>
            will <span className={'color-red'}>not</span>
          </b>{' '}
          allow the players to make bets
        </p>
      )

    return (
      <p>
        Turning <b>ON</b> the Markets{' '}
        <b>
          will <span className={'color-light-blue'}>allow</span>
        </b>{' '}
        <br />
        the players to make bets
      </p>
    )
  }

  return (
    <Box>
      <Modal
        open
        id='BetStatusEditModal'
        handleClose={onModalHide}
      >
        <div className={styles.textAlignCenter}>
          <WarnIcon />
        </div>
        <div className={styles.textAlignCenter}>{rendWarnText(isMsgEdit)}</div>

        <div className={styles.engKorDiv}>
          <Button
            variant={selectedLang === langEnum.eng ? 'contained' : 'outlined'}
            onClick={() => setSelectedLang(langEnum.eng)}
          >
            ENG
          </Button>

          <Button
            variant={selectedLang === langEnum.kor ? 'contained' : 'outlined'}
            onClick={() => setSelectedLang(langEnum.kor)}
          >
            KOR
          </Button>
        </div>

        {!isMsgEdit && (
          <p className={`${styles.textAlignCenter} ${styles.msgContent}`}>
            {contents[selectedLang]}
          </p>
        )}

        <div className={styles.form_wrapper}>
          <div className={styles.form_wrapper}>
            <Formik
              initialValues={{ password: '' }}
              validationSchema={Yup.object().shape({
                password: Yup.string().required('Password is required'),
              })}
              onSubmit={(values) => handleSubmit(values, isMsgEdit)}
            >
              {(props) => (
                <Form
                  className='login-form'
                  onSubmit={props.handleSubmit}
                >
                  {isMsgEdit && (
                    <div className={styles.textAreaDiv}>
                      <label htmlFor={'textarea'}>Message</label>
                      <textarea
                        maxLength={250}
                        name={'textarea'}
                        onChange={(e) => {
                          setTextAreaLength(e.target.textLength)
                          setContents({
                            ...contents,
                            [selectedLang]: e.target.value,
                          })
                        }}
                        value={contents[selectedLang]}
                        placeholder={`Only ${
                          selectedLang === langEnum.eng ? 'English' : 'Korean'
                        } letters allowed.`}
                      />
                      <p>250/{textAreaLength}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor='password'>Password</label>
                    <div>
                      <input
                        id='password'
                        type={'password'}
                        name='password'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        className={
                          props.touched.password && props.errors.password
                            ? 'error_input'
                            : ''
                        }
                      />
                    </div>
                    {props.touched.password && props.errors.password && (
                      <span className={`${styles.error_text} error_text`}>
                        {props.errors.password}
                      </span>
                    )}
                  </div>

                  <div className={`${styles.buttonContainer}`}>
                    <Button
                      // buttonSize={'md'}
                      // buttonStyle="outline"
                      variant='outlined'
                      onClick={() => {
                        // hide('BetStatusEditModal')
                        onModalHide()
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      // buttonSize={'md'}
                      variant='contained'
                      disabled={
                        !!props.errors.password ||
                        !textAreaLength ||
                        !props.values.password
                      }
                    >
                      Confirm
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </Box>
  )
}

export default BetStatusEditModal
