import { useEffect, useMemo } from 'react'
import { account } from '@senswap/sen-js'
import Joyride, { CallBackProps, EVENTS, STATUS } from 'react-joyride'

import Tooltip from './tooltip'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import { setWalkthrough, WalkThroughType } from 'os/store/walkthrough.reducer'
import './index.os.less'
import { DEFAULT_STEPS, NEWCOMER_STEPS, REFERRAL_STEPS } from './steps'

const Walkthrough = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const {
    wallet: { address },
    walkthrough: { type, run, step },
    flags: { visited },
  } = useRootSelector((state: RootState) => state)

  useEffect(() => {
    if (account.isAddress(address) && !visited)
      dispatch(setWalkthrough({ type: WalkThroughType.NewComer, run: true }))
  }, [address, dispatch, visited])

  const onCallback = async ({
    type,
    status,
    step: { target },
  }: CallBackProps) => {
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (options.includes(status))
      return dispatch(setWalkthrough({ run: false }))
    if ((EVENTS.TARGET_NOT_FOUND as string) === type) {
      await dispatch(setWalkthrough({ run: false }))
      const intervalId = setInterval(() => {
        const element = document.querySelector(target as string)
        const { x } = element?.getBoundingClientRect() || { x: -1 }
        // Make sure that there exits a target in the view port horizontally
        if (x > 0 && x < window.innerWidth) {
          clearInterval(intervalId)
          return dispatch(setWalkthrough({ run: true }))
        }
      }, 500)
    }
  }

  const steps = useMemo(() => {
    if (type === WalkThroughType.NewComer) return NEWCOMER_STEPS
    if (type === WalkThroughType.Referral) return REFERRAL_STEPS
    return DEFAULT_STEPS
  }, [type])

  return (
    <Joyride
      continuous={true}
      run={run}
      steps={steps}
      stepIndex={step}
      scrollOffset={128}
      scrollToFirstStep={true}
      showProgress={true}
      showSkipButton={true}
      callback={onCallback}
      tooltipComponent={Tooltip}
    />
  )
}

export default Walkthrough
