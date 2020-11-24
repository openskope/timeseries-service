## 
## # Targets for building, testing, and install custom code in this REPRO.
## 

clean-code:             ## Delete artifacts from previous builds.
	$(RUN_IN_REPRO) 'make -C ${REPRO_CODE_DIR} clean'
	
build-code:             ## Build custom code.
	$(RUN_IN_REPRO) 'make -C ${REPRO_CODE_DIR} build'

test-code:              ## Run tests on custom code.
	$(RUN_IN_REPRO) 'make -C ${REPRO_CODE_DIR} test'

package-code:         	## Package custom code for distribution
	$(RUN_IN_REPRO) 'make -C ${REPRO_CODE_DIR} package'
