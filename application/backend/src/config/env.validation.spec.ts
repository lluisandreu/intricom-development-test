import { envValidationSchema } from './env.validation';

describe('envValidationSchema', () => {
  it('accepts DATA_TYPE=DB without FS_FOLDER', () => {
    const { error } = envValidationSchema.validate({ DATA_TYPE: 'DB' });

    expect(error).toBeUndefined();
  });

  it('accepts DATA_TYPE=FS when FS_FOLDER is provided', () => {
    const { error } = envValidationSchema.validate({
      DATA_TYPE: 'FS',
      FS_FOLDER: './fs-data',
    });

    expect(error).toBeUndefined();
  });

  it('rejects DATA_TYPE=FS when FS_FOLDER is missing', () => {
    const { error } = envValidationSchema.validate({ DATA_TYPE: 'FS' });

    expect(error?.message).toContain('FS_FOLDER');
  });

  it('rejects DATA_TYPE=FS when FS_FOLDER is empty', () => {
    const { error } = envValidationSchema.validate({
      DATA_TYPE: 'FS',
      FS_FOLDER: '',
    });

    expect(error?.message).toContain('FS_FOLDER');
  });

  it('rejects a missing DATA_TYPE', () => {
    const { error } = envValidationSchema.validate({});

    expect(error?.message).toContain('DATA_TYPE');
  });

  it('rejects an unknown DATA_TYPE value', () => {
    const { error } = envValidationSchema.validate({ DATA_TYPE: 'CACHE' });

    expect(error?.message).toContain('DATA_TYPE');
  });
});
