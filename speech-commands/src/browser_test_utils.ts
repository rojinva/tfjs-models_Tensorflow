/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

/**
 * Testing Utilities for Browser Audio Feature Extraction.
 */

export class FakeAudioContext {
  readonly sampleRate = 44100;

  static createInstance() {
    return new FakeAudioContext();
  }

  // tslint:disable-next-line:no-any
  createMediaStreamSource(): any {
    return new FakeMediaStreamAudioSourceNode();
  }

  // tslint:disable-next-line:no-any
  createAnalyser(): any {
    return new FakeAnalyser();
  }

  close(): void {}
}

export class FakeAudioMediaStream {
  constructor() {}
}

class FakeMediaStreamAudioSourceNode {
  constructor() {}

  // tslint:disable-next-line:no-any
  connect(node: any): void {}
}

class FakeAnalyser {
  fftSize: number;
  smoothingTimeConstant: number;
  private x: number;
  constructor() {
    this.x = 0;
  }

  getFloatFrequencyData(data: Float32Array) {
    const xs: number[] = [];
    for (let i = 0; i < this.fftSize / 2; ++i) {
      xs.push(this.x++);
    }
    data.set(new Float32Array(xs));
  }

  disconnect(): void {}
}
